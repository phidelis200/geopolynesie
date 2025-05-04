import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Select } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Contact, ContactProps } from '@/types';
import { Head } from '@inertiajs/react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, Loader, MessageSquare, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/admin/contacts',
    },
];

export default function Contacts({ contacts }: ContactProps) {
    const [contactsList, setContactsList] = useState<Contact[]>(contacts.data || []);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [response, setResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredContacts = useMemo(() => {
        return contactsList.filter((contact) => {
            const matchesSearch =
                search.trim() === '' ||
                contact.name.toLowerCase().includes(search.toLowerCase()) ||
                contact.email.toLowerCase().includes(search.toLowerCase()) ||
                contact.subject.toLowerCase().includes(search.toLowerCase()) ||
                contact.message.toLowerCase().includes(search.toLowerCase()) ||
                (contact.answer_message && contact.answer_message.toLowerCase().includes(search.toLowerCase()));

            const matchesFilter = filter === 'all' || contact.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [contactsList, search, filter]);

    const handleResponse = async () => {
        if (!selectedContact) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(`/contact/${selectedContact.id}/respond`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ answer_message: response }),
            });

            if (!res.ok) throw new Error('Failed to send response');

            const data = await res.json();
            toast.success('Réponse envoyée avec succès');
            setContactsList((prev) => prev.map((contact) => (contact.id === selectedContact.id ? { ...contact, ...data.contact } : contact)));
            setSelectedContact(null);
            setResponse('');
        } catch (error) {
            console.error(error);
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
                        <Input
                            className="w-full pl-10"
                            placeholder="Rechercher par nom, email ou sujet..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">Tous</option>
                            <option value="PENDING">En attente</option>
                            <option value="ANSWERED">Répondu</option>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredContacts.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">Aucun contact trouvé</div>
                    ) : (
                        filteredContacts.map((contact) => (
                            <Card key={contact.id} className="rounded-2xl p-6 shadow-none hover:shadow-sm">
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
                                                    <RichTextEditor value={response} onChange={(value) => setResponse(value)} />
                                                    <div className="mt-4 flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedContact(null);
                                                                setResponse('');
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <X className="mr-2 h-4 w-4" />
                                                            Annuler
                                                        </Button>
                                                        <Button
                                                            onClick={handleResponse}
                                                            disabled={!response || isSubmitting}
                                                            className={`bg-ocean-600 hover:bg-ocean-700 ${!response || isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                        >
                                                            {isSubmitting ? <Loader className="mr-2 h-4 w-4" /> : <Check className="mr-2 h-4 w-4" />}
                                                            {isSubmitting ? 'Envoyer...' : 'Envoyer'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
