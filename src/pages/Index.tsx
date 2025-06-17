
import React from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { UserInfoForm } from '@/components/UserInfoForm';
import { FileUpload } from '@/components/FileUpload';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { ProductRecommendations } from '@/components/ProductRecommendations';

function AppContent() {
  const { currentStep, isLoading } = useApp();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-analytics-blue mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Your Data</h3>
            <p className="text-gray-600">Please wait while we analyze your Superstore dataset...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserInfoForm />;
      case 2:
        return <FileUpload />;
      case 3:
        return <AnalyticsDashboard />;
      case 4:
        return <ProductRecommendations />;
      default:
        return <UserInfoForm />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
