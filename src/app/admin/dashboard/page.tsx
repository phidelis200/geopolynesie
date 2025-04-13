"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "./actions";
import { Card } from "@/components/ui/card";
import { BarChart3, Newspaper, MessageSquare, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Jan", visits: 400 },
  { name: "Feb", visits: 300 },
  { name: "Mar", visits: 600 },
  { name: "Apr", visits: 800 },
  { name: "May", visits: 500 },
  { name: "Jun", visits: 700 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    {
      title: "Articles publiés",
      value: 0,
      icon: Newspaper,
      color: "bg-blue-500",
    },
    {
      title: "Contacts reçus",
      value: 0,
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      title: "Contacts en attente",
      value: 0,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats([
        {
          title: "Articles publiés",
          value: data.newsCount,
          icon: Newspaper,
          color: "bg-blue-500",
        },
        {
          title: "Contacts reçus",
          value: data.contactsCount,
          icon: MessageSquare,
          color: "bg-green-500",
        },
        {
          title: "Contacts en attente",
          value: data.pendingContactsCount,
          icon: TrendingUp,
          color: "bg-orange-500",
        },
      ]);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 flex border-1 !shadow-none items-center space-x-4"
          >
            <div className={`${stat.color} p-4 rounded-lg text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mb-8 border-1 !shadow-none">
        <h2 className="text-xl font-semibold mb-4">Statistiques des visites</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Add more dashboard content here */}
    </div>
  );
}
