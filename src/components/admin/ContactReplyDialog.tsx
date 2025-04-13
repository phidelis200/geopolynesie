"use client";
import { X } from "lucide-react";

interface ContactReplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contact: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  onSubmit: (data: { message: string }) => Promise<void>;
}

export default function ContactReplyDialog({
  isOpen,
  onClose,
  contact,
  onSubmit,
}: ContactReplyDialogProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit({ message: formData.get("message") as string });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Répondre au message</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="mb-2">
                <span className="font-semibold">De:</span> {contact.name} (
                {contact.email})
              </div>
              <div className="mb-2">
                <span className="font-semibold">Sujet:</span> {contact.subject}
              </div>
              <div className="text-gray-600">{contact.message}</div>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                name="message"
                rows={6}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-ocean-500"
                placeholder="Votre réponse..."
              />

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-outline-ocean px-4 py-2"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-ocean px-4 py-2">
                  Envoyer la réponse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
