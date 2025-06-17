
import React from 'react';
import { useApp } from '@/contexts/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentStep, userInfo } = useApp();
  
  const steps = [
    { number: 1, title: 'User Info', description: 'Personal Details' },
    { number: 2, title: 'Upload', description: 'CSV Data' },
    { number: 3, title: 'Analytics', description: 'Insights & Charts' },
    { number: 4, title: 'Recommendations', description: 'Product Suggestions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-analytics-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Superstore Analytics</h1>
                <p className="text-sm text-gray-500">Business Intelligence Platform</p>
              </div>
            </div>
            {userInfo && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {userInfo.fullName}</p>
                <p className="text-xs text-gray-500">{userInfo.jobTitle}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-8">
                {steps.map((step, index) => (
                  <li key={step.number} className="flex items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep > step.number
                            ? 'bg-analytics-green text-white'
                            : currentStep === step.number
                            ? 'bg-analytics-blue text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > step.number ? '✓' : step.number}
                      </div>
                      <div className="ml-3 text-left">
                        <p className={`text-sm font-medium ${
                          currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="ml-8 w-8 h-0.5 bg-gray-300" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 Superstore Analytics Platform. Built for business intelligence and data-driven decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
