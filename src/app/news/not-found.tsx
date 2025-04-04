import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow pt-24">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Article non trouvé
          </h1>
          <p className="mt-4 text-gray-600">
            L'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link href="/news" className="mt-6 inline-block btn-ocean">
            <ArrowLeft size={18} className="mr-2 inline" /> Retour aux
            actualités
          </Link>
        </div>
      </div>
    </main>
  );
}
