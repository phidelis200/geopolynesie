import { Plus } from "lucide-react";
import { NewsTable } from "./news-table";
import Link from "next/link";

interface SearchParams {
  page?: string;
}

export default function AdminNews({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Actualités
        </h1>
        <Link
          href="/admin/news/create"
          className="btn-ocean flex items-center gap-2"
        >
          <Plus size={20} /> Nouvelle Actualité
        </Link>
      </div>
      <NewsTable initialPage={Number(searchParams.page) || 1} />
    </div>
  );
}
