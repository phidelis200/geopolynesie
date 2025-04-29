import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Contact } from '@/types';
import { Head } from '@inertiajs/react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, MessageSquare, Search, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/admin/contacts',
    },
];

export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [response, setResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResponse = async () => {
        if (!selectedContact) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/contact/${selectedContact.id}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer_message: response }),
            });

            if (!res.ok) throw new Error('Failed to send response');

            toast.success('Réponse envoyée avec succès');
            setContacts((prev) => prev.map((contact) => (contact.id === selectedContact.id ? { ...contact, status: 'ANSWERED' } : contact)));
            setSelectedContact(null);
            setResponse('');
        } catch (error) {
            toast.error("Erreur lors de l'envoi de la réponse");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Header */}
            <Head title="Contacts" />
            <div className="flex flex-col gap-4 p-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gestion des Contacts</h1>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative w-full flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        <Input className="w-full pl-10" placeholder="Rechercher un journal..." onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                        <Select className="w-full sm:w-48" onChange={(e) => setFilter(e.target.value)}>
                            <option value="" disabled selected>
                                Filtrer par statut
                            </option>
                            <option value="all">Tous</option>
                            <option value="PENDING">Brouillon</option>
                            <option value="ANSWERED">Archivé</option>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                </div>
                                <Badge variant={contact.status === 'PENDING' ? 'destructive' : 'secondary'}>
                                    {contact.status === 'PENDING' ? 'En attente' : 'Répondu'}
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-medium">{contact.subject}</h4>
                                <p className="mt-2 text-gray-600">{contact.message}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {formatDistance(new Date(contact.created_at), new Date(), {
                                        addSuffix: true,
                                        locale: fr,
                                    })}
                                </span>
                                {contact.status === 'PENDING' && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" onClick={() => setSelectedContact(contact)}>
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Répondre
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Répondre au message</DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <Textarea
                                                    placeholder="Votre réponse..."
                                                    value={response}
                                                    onChange={(e) => setResponse(e.target.value)}
                                                    rows={6}
                                                />
                                                <div className="mt-4 flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setSelectedContact(null);
                                                            setResponse('');
                                                        }}
                                                    >
                                                        <X className="mr-2 h-4 w-4" />
                                                        Annuler
                                                    </Button>
                                                    <Button onClick={handleResponse} disabled={!response || isSubmitting}>
                                                        <Check className="mr-2 h-4 w-4" />
                                                        Envoyer
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
