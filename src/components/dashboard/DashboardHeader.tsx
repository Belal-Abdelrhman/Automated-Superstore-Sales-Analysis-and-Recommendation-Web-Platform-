
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';

interface DashboardHeaderProps {
  onViewRecommendations: () => void;
}

export function DashboardHeader({ onViewRecommendations }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900">Superstore Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive business intelligence and insights</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button 
          onClick={onViewRecommendations}
          className="bg-analytics-blue hover:bg-blue-600 text-white flex items-center gap-2"
        >
          View Recommendations
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
