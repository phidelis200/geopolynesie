"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function NewsTable({ initialPage }: { initialPage: number }) {
  const [page, setPage] = useState(initialPage);
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const [newsData, totalCount] = await Promise.all([
        fetch(`/api/news?page=${page}&pageSize=${pageSize}`).then((res) =>
          res.json()
        ),
        fetch(`/api/news/count`).then((res) => res.json()),
      ]);
      setNews(newsData);
      setTotal(totalCount);
    };
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <div className="rounded-lg border bg-white">
        <Table className="!shadow-none">
          <TableHeader className="bg-ocean-50">
            <TableRow>
              <TableHead className="text-md">
                <b>Image</b>
              </TableHead>
              <TableHead className="text-md">
                <b>Titre</b>
              </TableHead>
              <TableHead className="text-md ">
                <b>Date</b>
              </TableHead>
              <TableHead className="text-md ">
                <b>Catégorie</b>
              </TableHead>
              <TableHead className="text-md ">
                <b>Auteur</b>
              </TableHead>
              <TableHead className="text-md text-right">
                <b>Actions</b>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="w-20">
                  {item.image ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="md:hidden text-xs text-gray-500 mb-1">
                    {new Date(item.date).toLocaleDateString("fr-FR")}
                  </div>
                  {item.title}
                </TableCell>
                <TableCell className="">
                  {new Date(item.date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell className="">{item.category}</TableCell>
                <TableCell className="">{item.author.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="text-ocean-600 hover:text-ocean-800"
                    >
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
