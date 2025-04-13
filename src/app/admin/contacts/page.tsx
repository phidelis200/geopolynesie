"use client";
import { useState, useEffect } from "react";
import { MessageCircle, CheckCircle, ArchiveIcon, Clock } from "lucide-react";
import ContactReplyDialog from "@/components/admin/ContactReplyDialog";
import { useRouter } from "next/navigation";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "PENDING" | "PROCESSED" | "ARCHIVED";
  createdAt: Date;
}

export default function AdminContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Empty dependency array for initial load only

  const handleStatusChange = async (
    contactId: string,
    status: Contact["status"]
  ) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleReply = async (data: { message: string }) => {
    if (!selectedContact) return;

    try {
      const response = await fetch(
        `/api/contacts/${selectedContact.id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        handleStatusChange(selectedContact.id, "PROCESSED");
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Clock className="animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSED":
        return "bg-green-100 text-green-800";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Messages de Contact
        </h1>
        <div className="flex gap-2">
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(e) => {
              // Add filter functionality here
            }}
          >
            <option value="all">Tous les messages</option>
            <option value="PENDING">En attente</option>
            <option value="PROCESSED">Traités</option>
            <option value="ARCHIVED">Archivés</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-ocean-200 transition-colors"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-ocean-800">
                    {contact.subject}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1 space-y-1 md:space-y-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <span>{contact.name}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{contact.email}</span>
                      {contact.phone && (
                        <>
                          <span className="hidden md:inline">•</span>
                          <span>{contact.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      contact.status
                    )}`}
                  >
                    {contact.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 whitespace-pre-line">
                {contact.message}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="btn-ocean-light flex items-center gap-2 cursor-pointer"
                  disabled={contact.status === "ARCHIVED"}
                >
                  <MessageCircle size={18} />
                  <span className="hidden md:inline">Répondre</span>
                </button>
                {contact.status === "PENDING" && (
                  <button
                    onClick={() => handleStatusChange(contact.id, "PROCESSED")}
                    className="btn-success-light flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle size={18} />
                    <span className="hidden md:inline">
                      Marquer comme traité
                    </span>
                  </button>
                )}
                {contact.status !== "ARCHIVED" && (
                  <button
                    onClick={() => handleStatusChange(contact.id, "ARCHIVED")}
                    className="btn-gray-light flex items-center gap-2 cursor-pointer"
                  >
                    <ArchiveIcon size={18} />
                    <span className="hidden md:inline">Archiver</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedContact && (
        <ContactReplyDialog
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          contact={selectedContact}
          onSubmit={handleReply}
        />
      )}
    </div>
  );
}
