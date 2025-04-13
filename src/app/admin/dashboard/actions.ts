"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const newsCount = await prisma.news.count();
  const contactsCount = await prisma.contact.count();
  const pendingContactsCount = await prisma.contact.count({
    where: { status: "PENDING" },
  });

  return {
    newsCount,
    contactsCount,
    pendingContactsCount,
  };
}
