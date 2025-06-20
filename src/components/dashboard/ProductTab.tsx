
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Package, Star } from 'lucide-react';
import { StarRating } from './charts/StarRating';
import { formatCurrency } from '@/utils/formatters';
import { subCategoryProfitData, productProfitTableData } from '@/data/mockData';

export function ProductTab() {
  return (
    <div className="space-y-6">
      {/* Product KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600">2K</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <Package className="w-12 h-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-pink-600">15.62%</div>
                <div className="text-sm text-gray-600">Average Discount</div>
                <div className="text-xs text-green-600">PY 15.60% YoY 0.09%</div>
              </div>
              <Star className="w-12 h-12 text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profit by Category and Sub-category */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Profit by Category and Sub-category</CardTitle>
          <CardDescription>Profit analysis across all sub-categories with loss highlighting</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={subCategoryProfitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="subCategory" 
                angle={-45} 
                textAnchor="end" 
                height={120}
                tick={{ fontSize: 10 }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                formatter={(value: any) => [
                  formatCurrency(Number(value)), 
                  value < 0 ? 'Loss' : 'Profit'
                ]}
                labelFormatter={(label) => `Sub-category: ${label}`}
              />
              <Bar dataKey="profit" name="Total Profit">
                {subCategoryProfitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit < 0 ? '#EF4444' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Profit Table */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Product Profit Analysis</CardTitle>
          <CardDescription>Detailed product performance with profit analysis and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Total Profit</TableHead>
                <TableHead>Profit Ratio</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productProfitTableData.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={product.productName}>
                      {product.productName}
                    </div>
                  </TableCell>
                  <TableCell>{product.totalOrders}</TableCell>
                  <TableCell>{formatCurrency(product.totalRevenue)}</TableCell>
                  <TableCell className={product.totalProfit < 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                    {formatCurrency(product.totalProfit)}
                  </TableCell>
                  <TableCell className={product.profitRatio < 0 ? 'text-red-600 font-semibold' : ''}>
                    {product.profitRatio.toFixed(1)}%
                  </TableCell>
                  <TableCell><StarRating rating={product.rating} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
