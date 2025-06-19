
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Target, User, ShoppingBag, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { generateProductRecommendations } from '@/utils/dataProcessor';
import { ProductRecommendation } from '@/types';

export function ProductRecommendations() {
  const { rawData, userInfo } = useApp();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueCustomers, setUniqueCustomers] = useState<Array<{id: string, name: string}>>([]);

  useEffect(() => {
    if (rawData) {
      const customers = Array.from(
        new Map(
          rawData.map(row => [row['customer id'], row['customer name']])
        ).entries()
      ).map(([id, name]) => ({ id, name }));
      
      setUniqueCustomers(customers.sort((a, b) => a.name.localeCompare(b.name)));
    }
  }, [rawData]);

  const handleGenerateRecommendations = () => {
    if (!rawData || !selectedCustomerId) return;
    
    setIsLoading(true);
    console.log('Generating recommendations for customer:', selectedCustomerId);
    
    // Get customer info - fix the calculation
    const customerData = rawData.filter(row => row['customer id'] === selectedCustomerId);
    if (customerData.length > 0) {
      const customer = customerData[0];
      const totalSpent = customerData.reduce((sum, row) => sum + (row.sales || 0), 0);
      const avgOrderValue = customerData.length > 0 ? totalSpent / customerData.length : 0;
      
      console.log('Customer calculation:', {
        totalOrders: customerData.length,
        totalSpent,
        avgOrderValue,
        sampleRow: customerData[0]
      });
      
      setCustomerInfo({
        name: customer['customer name'] || 'Unknown',
        segment: customer.segment || 'Unknown',
        region: customer.region || 'Unknown',
        totalOrders: customerData.length,
        totalSpent,
        avgOrderValue
      });
    }
    
    // Generate recommendations
    const recs = generateProductRecommendations(rawData, selectedCustomerId);
    console.log('Recommendations generated:', recs.length);
    setRecommendations(recs);
    setIsLoading(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 bg-purple-gradient rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Recommendations</h1>
        <p className="text-lg text-gray-600">
          AI-powered suggestions based on customer behavior and purchasing patterns
        </p>
      </div>

      {/* Customer Selection */}
      <Card className="mb-8 animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Select Customer
          </CardTitle>
          <CardDescription>
            Choose a customer to generate personalized product recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1 min-w-64">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Customer</label>
              <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer..." />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {uniqueCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleGenerateRecommendations}
              disabled={!selectedCustomerId || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Profile */}
      {customerInfo && (
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Customer Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{customerInfo.totalOrders}</div>
                <div className="text-sm text-blue-800">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(customerInfo.totalSpent)}</div>
                <div className="text-sm text-green-800">Total Spent</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(customerInfo.avgOrderValue)}</div>
                <div className="text-sm text-purple-800">Avg Order Value</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{customerInfo.segment}</div>
                <div className="text-sm text-orange-800">Customer Segment</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Customer:</span>
                <span className="text-sm text-gray-900">{customerInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Region:</span>
                <Badge variant="outline">{customerInfo.region}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900">Recommended Products</h2>
              <p className="text-gray-600">
                Based on similar customers in the {customerInfo?.segment} segment from {customerInfo?.region}
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Recommendations
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((recommendation, index) => (
              <Card key={recommendation.productName} className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Score: {recommendation.popularityScore}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" title={recommendation.productName}>
                        {recommendation.productName}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Category</span>
                          <Badge variant="outline" className="text-xs">
                            {recommendation.category}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Sub-Category</span>
                          <span className="text-sm font-medium text-gray-900">
                            {recommendation.subCategory}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Avg Sales</span>
                          <span className="text-sm font-semibold text-green-600">
                            {formatCurrency(recommendation.avgSales)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600">Popular Choice</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {recommendation.popularityScore} customers
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recommendations.length === 0 && !isLoading && selectedCustomerId && (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Found</h3>
                <p className="text-gray-600">
                  We couldn't find similar customers or suitable product recommendations for this customer.
                  This might be because they have a unique purchasing pattern or are in a small segment.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Welcome Message */}
      {!selectedCustomerId && userInfo && (
        <Card className="text-center py-12 animate-fade-in">
          <CardContent>
            <Target className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {userInfo.fullName}!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Select a customer above to generate personalized product recommendations using our AI-powered system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Customer Analysis</h3>
                <p className="text-sm text-gray-600">Analyze customer purchase history and behavior patterns</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Smart Clustering</h3>
                <p className="text-sm text-gray-600">Group similar customers based on segment and region</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Personalized Recommendations</h3>
                <p className="text-sm text-gray-600">Suggest products based on similar customer purchases</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
