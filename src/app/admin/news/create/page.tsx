"use client";
import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import Image from "next/image";

export default function CreateNews() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISH">("PUBLISH");
  const [uploadedImage, setUploadedImage] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only show preview, store file for later upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setImageFile(null);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "DRAFT" | "PUBLISH");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      let imageUrl = "";

      // Only upload image to Cloudinary if publishing
      if (imageFile && status === "PUBLISH") {
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Upload failed");
        }

        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          content,
          category: formData.get("category"),
          image: imageUrl || previewImage, // Use preview URL for draft
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create news");
      }

      router.push("/admin/news");
    } catch (error) {
      console.error("Failed to create news:", error);
      alert("Failed to create news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link
          href="/admin/news"
          className="text-ocean-600 hover:text-ocean-800 mr-4"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Nouvelle Actualité</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-ocean-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image principale
            </label>
            <div className="flex items-center gap-4">
              {previewImage && (
                <div className="relative w-40 h-24 group">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}
              <label className="flex items-center px-6 py-3 bg-white border-2 border-dashed border-ocean-400 text-ocean-600 rounded-xl hover:border-ocean-500 hover:bg-ocean-50 transition-all duration-200 cursor-pointer group">
                <Upload
                  size={20}
                  className="mr-3 group-hover:scale-110 transition-transform duration-200"
                />
                <span className="font-medium">Sélectionner une image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              name="category"
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-ocean-500"
            >
              <option value="Projets">Projets</option>
              <option value="Partenariats">Partenariats</option>
              <option value="Événements">Événements</option>
              <option value="Équipements">Équipements</option>
              <option value="Formation">Formation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              required
              value={status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-ocean-500"
            >
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISH">Publier</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/news" className="btn-outline-ocean px-6 py-2">
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-ocean px-6 py-2 cursor-pointer disabled:opacity-50"
          >
            {loading
              ? "Enregistrement..."
              : status === "DRAFT"
              ? "Brouillon"
              : "Publier"}
          </button>
        </div>
      </form>
    </div>
  );
}
