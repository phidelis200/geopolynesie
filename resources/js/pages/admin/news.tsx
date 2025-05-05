import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Select } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, type BreadcrumbItem, type NewsItem } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AdminNewsProps extends PageProps {
    newsItems: PaginatedData<NewsItem>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Journaux',
        href: '/admin/news',
    },
];

export default function News() {
    const { newsItems } = usePage<AdminNewsProps>().props;
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedJournal, setSelectedJournal] = useState<NewsItem | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        status: 'DRAFT',
        image: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialFormData = {
        title: '',
        content: '',
        category: '',
        status: 'DRAFT',
        image: null as File | null,
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setImagePreview(null);
    };

    const handleAddJournal = () => {
        setIsAddDrawerOpen(true);
    };

    const handleEditJournal = (journal: NewsItem) => {
        setSelectedJournal(journal);
        setFormData({
            title: journal.title,
            content: journal.content,
            category: journal.category,
            status: journal.status,
            image: null,
        });
        setImagePreview(journal.image || null);
        setIsEditDrawerOpen(true);
    };

    const handleDeleteJournal = (journal: NewsItem) => {
        setSelectedJournal(journal);
        setIsDeleteDialogOpen(true);
    };

    const handleSearch = (value: string) => {
        router.get('/admin/news', { search: value }, { preserveState: true });
    };

    const handleCategoryFilter = (value: string) => {
        router.get('/admin/news', { category: value }, { preserveState: true });
    };

    const handleStatusFilter = (value: string) => {
        router.get('/admin/news', { status: value }, { preserveState: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                form.append(key, value);
            }
        });

        router.post('/admin/news', form, {
            forceFormData: true,
            onSuccess: () => {
                setIsAddDrawerOpen(false);
                resetForm();
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedJournal) return;

        setIsSubmitting(true);

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                form.append(key, value);
            }
        });
        form.append('_method', 'PUT');

        // Fix: Use the slug instead of id for the route
        router.post(`/admin/news/${selectedJournal.slug}`, form, {
            forceFormData: true,
            onSuccess: () => {
                setIsEditDrawerOpen(false);
                setSelectedJournal(null);
                resetForm();
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleDelete = () => {
        if (!selectedJournal) return;

        router.delete(`/admin/news/${selectedJournal.slug}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedJournal(null);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, image: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleAddDrawerClose = () => {
        setIsAddDrawerOpen(false);
        resetForm();
    };

    const handleEditDrawerClose = () => {
        setIsEditDrawerOpen(false);
        resetForm();
    };

    const categories = ['Projets', 'Partenariats', 'Événements', 'Équipements', 'Formation'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Journaux" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">Gestion des Journaux</h1>
                    <Button onClick={handleAddJournal} className="bg-ocean-600 hover:bg-ocean-700 w-full cursor-pointer sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un journal
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative w-full flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        <Input className="w-full pl-10" placeholder="Rechercher un journal..." onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                        <Select className="w-full sm:w-48" onChange={(e) => handleCategoryFilter(e.target.value)}>
                            <option value="" disabled selected>
                                Filtrer par catégorie
                            </option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                        <Select className="w-full sm:w-48" onChange={(e) => handleStatusFilter(e.target.value)}>
                            <option value="" disabled selected>
                                Filtrer par statut
                            </option>
                            <option value="PUBLISH">Publié</option>
                            <option value="DRAFT">Brouillon</option>
                            <option value="ARCHIVED">Archivé</option>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <Card className="overflow-x-auto rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[100px]">Image</TableHead>
                                <TableHead className="min-w-[200px]">Titre</TableHead>
                                <TableHead className="min-w-[150px]">Catégorie</TableHead>
                                <TableHead className="min-w-[150px]">Auteur</TableHead>
                                <TableHead className="min-w-[120px]">Date</TableHead>
                                <TableHead className="min-w-[100px]">Statut</TableHead>
                                <TableHead className="min-w-[100px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newsItems.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="h-16 w-24 overflow-hidden rounded-md">
                                            <img
                                                src={item.image || '/assets/default-news.jpg'}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.author.name}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString('fr-FR')}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                item.status === 'PUBLISH'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                    : item.status === 'DRAFT'
                                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditJournal(item)}
                                            className="mr-2 cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteJournal(item)}
                                            className="cursor-pointer text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

                {/* Add Journal Drawer */}
                <Sheet open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
                    <SheetContent className="overflow-y-auto sm:max-w-xl">
                        <SheetHeader>
                            <SheetTitle>Ajouter un nouveau journal</SheetTitle>
                            <SheetDescription>Créez un nouveau journal en remplissant les informations ci-dessous.</SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4 p-4">
                            <div>
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Entrez le titre..."
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Catégorie</Label>
                                <Select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full"
                                    required
                                >
                                    <option value="" disabled>
                                        Sélectionnez une catégorie
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Statut</Label>
                                <Select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full"
                                    required
                                >
                                    <option value="DRAFT">Brouillon</option>
                                    <option value="PUBLISH">Publier</option>
                                    <option value="ARCHIVED">Archiver</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" className="h-40 w-auto rounded-md object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="content">Contenu</Label>
                                <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button className="cursor-pointer" variant="outline" type="button" onClick={handleAddDrawerClose}>
                                    Annuler
                                </Button>
                                <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700 cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                </Button>
                            </div>
                        </form>
                    </SheetContent>
                </Sheet>

                {/* Edit Journal Drawer */}
                <Sheet open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
                    <SheetContent className="overflow-y-auto sm:max-w-xl">
                        <SheetHeader>
                            <SheetTitle>Modifier un journal</SheetTitle>
                            <SheetDescription>Modifiez les informations du journal.</SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleEditSubmit} className="mt-6 space-y-4 p-4">
                            <div>
                                <Label htmlFor="edit-title">Titre</Label>
                                <Input
                                    id="edit-title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Entrez le titre..."
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-category">Catégorie</Label>
                                <Select
                                    id="edit-category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full"
                                    required
                                >
                                    <option value="" disabled>
                                        Sélectionnez une catégorie
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit-status">Statut</Label>
                                <Select
                                    id="edit-status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full"
                                    required
                                >
                                    <option value="DRAFT">Brouillon</option>
                                    <option value="PUBLISH">Publier</option>
                                    <option value="ARCHIVED">Archiver</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit-image">Image</Label>
                                <Input id="edit-image" type="file" accept="image/*" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" className="h-40 w-auto rounded-md object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="edit-content">Contenu</Label>
                                <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" className="cursor-pointer" type="button" onClick={handleEditDrawerClose}>
                                    Annuler
                                </Button>
                                <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700 cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </Button>
                            </div>
                        </form>
                    </SheetContent>
                </Sheet>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce journal ?</AlertDialogTitle>
                            <AlertDialogDescription>Cette action est irréversible. Le journal sera définitivement supprimé.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="cursor-pointer bg-red-600 hover:bg-red-700">
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
