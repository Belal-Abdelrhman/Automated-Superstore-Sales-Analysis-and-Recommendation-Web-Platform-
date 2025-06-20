
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, ShoppingCart, Users, Star, Package } from 'lucide-react';
import { formatCompactNumber, formatCurrency, formatNumber } from '@/utils/formatters';

interface KPICardsProps {
  analyticsData: any;
}

export function KPICards({ analyticsData }: KPICardsProps) {
  const profitRatio = analyticsData.totalSales > 0 ? (analyticsData.totalProfit / analyticsData.totalSales * 100) : 0;
  const avgOrderValue = analyticsData.totalOrders > 0 ? analyticsData.totalSales / analyticsData.totalOrders : 0;

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCompactNumber(analyticsData.totalSales),
      icon: DollarSign,
      color: 'bg-blue-600',
      trend: '+46.89%'
    },
    {
      title: 'Total Profit',
      value: formatCompactNumber(analyticsData.totalProfit),
      icon: TrendingUp,
      color: 'bg-green-600',
      trend: '+48.42%'
    },
    {
      title: 'Total Orders',
      value: formatCompactNumber(analyticsData.totalOrders),
      icon: ShoppingCart,
      color: 'bg-purple-600',
      trend: '+50.78%'
    },
    {
      title: 'Total Customers',
      value: formatNumber(analyticsData.uniqueCustomers),
      icon: Users,
      color: 'bg-teal-600',
      trend: '+0.68%'
    },
    {
      title: 'Profit Ratio',
      value: `${profitRatio.toFixed(2)}%`,
      icon: Star,
      color: 'bg-emerald-500',
      trend: '+1.04%'
    },
    {
      title: 'AOV',
      value: formatCurrency(avgOrderValue),
      icon: Package,
      color: 'bg-cyan-600',
      trend: '+12.5%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={kpi.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 ${kpi.color} rounded-lg flex items-center justify-center`}>
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-green-600 mt-1">YoY {kpi.trend}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
