import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface NewsItem {
    id: number;
    title: string;
    content: string;
    author: Author;
    published_at: string;
    tags?: string[];
    [key: string]: unknown;
}

export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string;
    date: string;
    status: 'PUBLISH' | 'DRAFT' | 'ARCHIVED';
    read_time: number;
    author_id: number;
    category: string;
}

export interface NewsHomePage {
    newsItems: NewsItem[];
}

export interface RecentNews {
    title: string;
    slug: string;
    author: string;
    journal: string;
    year: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

export interface NewsProps {
    newsItems: PaginatedData<NewsItem>;
    recentPublications: RecentNews[];
}

export interface Author {
    id: number;
    name: string;
}

export interface NewsItemDetail extends NewsItem {
    author: Author;
}

export interface NewsDetailPageProps {
    newsItem: NewsItemDetail;
    relatedNews: NewsItem[];
    categories: string[];
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'PENDING' | 'ANSWERED';
    created_at: string;
}
