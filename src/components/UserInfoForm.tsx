
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Briefcase, ArrowRight } from 'lucide-react';

export function UserInfoForm() {
  const { setUserInfo, setCurrentStep } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    } else if (formData.jobTitle.length < 2) {
      newErrors.jobTitle = 'Job title must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setUserInfo(formData);
      setCurrentStep(2);
      console.log('User info saved:', formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 bg-analytics-gradient rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Superstore Analytics</h1>
        <p className="text-lg text-gray-600">
          Let's get started by collecting some basic information to personalize your experience.
        </p>
      </div>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-analytics-blue" />
            Personal Information
          </CardTitle>
          <CardDescription>
            This information will be used to personalize your analytics reports and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                Job Title *
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="jobTitle"
                  type="text"
                  placeholder="e.g., Business Analyst, Sales Manager, CEO"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className={`pl-10 ${errors.jobTitle ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.jobTitle && (
                <p className="text-sm text-red-600">{errors.jobTitle}</p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-analytics-blue hover:bg-blue-600 text-white"
                size="lg"
              >
                Continue to Upload
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Instant Analytics</h3>
          <p className="text-sm text-gray-600">Get comprehensive insights from your data in seconds</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Smart Recommendations</h3>
          <p className="text-sm text-gray-600">AI-powered product suggestions for your customers</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Interactive Dashboards</h3>
          <p className="text-sm text-gray-600">Explore your data with dynamic charts and filters</p>
        </div>
      </div>
    </div>
  );
}
