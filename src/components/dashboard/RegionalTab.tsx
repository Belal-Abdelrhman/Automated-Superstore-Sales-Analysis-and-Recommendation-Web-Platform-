
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { MapPin } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { regionalCustomerGrowthData, regionalSalesByYearData, stateProfitData, getStateColor } from '@/data/mockData';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export function RegionalTab() {
  // Create a map for quick lookup
  const stateProfitMap = Object.fromEntries(
    stateProfitData.map(item => [item.state, item.profit])
  );

  return (
    <div className="space-y-6">
      {/* US Profit Map */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Total Profit by State
          </CardTitle>
          <CardDescription>Geographic visualization of profit distribution across U.S. states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>Low Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-300 rounded"></div>
                <span>Medium Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>High Profit</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '400px' }}>
            <ComposableMap projection="geoAlbersUsa" width={800} height={400}>
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const profit = stateProfitMap[stateName] || 0;
                      const color = getStateColor(profit);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={color}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', fill: '#374151' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </CardContent>
      </Card>

      {/* Two charts in a row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Customer Growth by Years */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Regional Customer Growth by Years</CardTitle>
            <CardDescription>New customers acquired by region each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalCustomerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} customers`, '']} />
                <Legend />
                <Bar dataKey="East" fill="#3B82F6" />
                <Bar dataKey="West" fill="#10B981" />
                <Bar dataKey="Central" fill="#F59E0B" />
                <Bar dataKey="South" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Sales by Years */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Regional Sales by Years</CardTitle>
            <CardDescription>Total sales amount by region each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalSalesByYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Sales']} />
                <Legend />
                <Bar dataKey="East" fill="#3B82F6" />
                <Bar dataKey="West" fill="#10B981" />
                <Bar dataKey="Central" fill="#F59E0B" />
                <Bar dataKey="South" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
