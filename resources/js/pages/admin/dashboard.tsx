import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { MessageSquare, Newspaper, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define Types
interface Stat {
    title: string;
    value: number;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
}

interface ApiResponse {
    newsCount: number;
    contactsCount: number;
    pendingContactsCount: number;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tableau de bord', href: '/admin/dashboard' }];

const sampleData = [
    { name: 'Jan', visits: 400 },
    { name: 'Feb', visits: 300 },
    { name: 'Mar', visits: 600 },
    { name: 'Apr', visits: 800 },
    { name: 'May', visits: 500 },
    { name: 'Jun', visits: 700 },
];

export default function Dashboard() {
    const [stats, setStats] = useState<Stat[]>([
        { title: 'Articles publiés', value: 0, icon: Newspaper, color: 'bg-blue-500' },
        { title: 'Contacts reçus', value: 0, icon: MessageSquare, color: 'bg-green-500' },
        { title: 'Contacts en attente', value: 0, icon: TrendingUp, color: 'bg-orange-500' },
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Memoized chart config
    const chartConfig = useMemo(() => {
        return {
            gridColor: '#e5e7eb',
            axisColor: '#6b7280',
            textColor: '#d1d5db',
            lineColor: '#3b82f6',
        };
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get<ApiResponse>('/admin/dashboard-stats');
                setStats([
                    { title: 'Articles publiés', value: data.newsCount, icon: Newspaper, color: 'bg-blue-500' },
                    { title: 'Contacts reçus', value: data.contactsCount, icon: MessageSquare, color: 'bg-green-500' },
                    { title: 'Contacts en attente', value: data.pendingContactsCount, icon: TrendingUp, color: 'bg-orange-500' },
                ]);
            } catch (err) {
                setError('Failed to load statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />
            <div className="flex flex-col gap-6 p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <Card key={index} className="animate-pulse rounded-2xl border-none">
                                <div className="h-20 w-full rounded"></div>
                            </Card>
                        ))
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500">{error}</div>
                    ) : (
                        stats.map((stat, index) => (
                            <Card key={index} className="flex flex-col gap-4 rounded-2xl border-none p-6 shadow-sm transition hover:shadow-md">
                                <div className="flex items-center justify-center">
                                    <div className={`${stat.color} rounded-full p-3 text-white`}>
                                        <stat.icon size={28} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-md font-medium">{stat.title}</p>
                                    <h3 className="text-4xl font-bold">{stat.value}</h3>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

                {/* Chart Card */}
                <Card className="rounded-2xl border-none p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Statistiques des visites</h2>
                    <div className="h-[300px] overflow-hidden">
                        {' '}
                        {/* Fix for resize lag [[5]][[9]] */}
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sampleData}>
                                <CartesianGrid strokeDasharray="4 4" stroke={chartConfig.gridColor} />
                                <XAxis dataKey="name" stroke={chartConfig.axisColor} />
                                <YAxis stroke={chartConfig.axisColor} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: 'white' }}
                                    labelStyle={{ color: chartConfig.textColor }}
                                />
                                <Line type="monotone" dataKey="visits" stroke={chartConfig.lineColor} strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
