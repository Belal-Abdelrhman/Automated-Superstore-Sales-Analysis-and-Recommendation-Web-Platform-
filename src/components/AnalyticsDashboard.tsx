
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { OverviewTab } from './dashboard/OverviewTab';
import { RegionalTab } from './dashboard/RegionalTab';
import { CustomerTab } from './dashboard/CustomerTab';
import { OrdersTab } from './dashboard/OrdersTab';
import { ProductTab } from './dashboard/ProductTab';

export function AnalyticsDashboard() {
  const { analyticsData, setCurrentStep } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-analytics-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your data...</p>
        </div>
      </div>
    );
  }

  const handleViewRecommendations = () => {
    setCurrentStep(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader onViewRecommendations={handleViewRecommendations} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <RegionalTab />
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          <CustomerTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <OrdersTab analyticsData={analyticsData} />
        </TabsContent>

        <TabsContent value="product" className="space-y-6">
          <ProductTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
