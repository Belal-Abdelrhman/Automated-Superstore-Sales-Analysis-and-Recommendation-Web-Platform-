
import React, { useState, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { validateSuperstoreData, processSuperstoreData } from '@/utils/dataProcessor';
import Papa from 'papaparse';

export function FileUpload() {
  const { setRawData, setAnalyticsData, setCurrentStep, setIsLoading } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file']);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrors(['File size must be less than 50MB']);
      return;
    }

    setFile(file);
    setErrors([]);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('CSV parsed:', results.data.length, 'rows');
        
        const validation = validateSuperstoreData(results.data);
        setErrors(validation.errors);
        setIsValid(validation.isValid);
        
        if (validation.isValid) {
          setPreview(results.data.slice(0, 5));
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        setErrors([`Error parsing CSV: ${error.message}`]);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handleAnalyze = useCallback(() => {
    if (!file || !isValid) return;
    
    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          console.log('Processing data for analysis...');
          const processedData = results.data as any[];
          const analyticsData = processSuperstoreData(processedData);
          
          setRawData(processedData);
          setAnalyticsData(analyticsData);
          setCurrentStep(3);
          console.log('Analysis complete, moving to step 3');
        } catch (error) {
          console.error('Error processing data:', error);
          setErrors(['Error processing data. Please check your file format.']);
        } finally {
          setIsLoading(false);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        setErrors([`Error parsing CSV: ${error.message}`]);
        setIsLoading(false);
      }
    });
  }, [file, isValid, setRawData, setAnalyticsData, setCurrentStep, setIsLoading]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 bg-analytics-gradient rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Superstore Dataset</h1>
        <p className="text-lg text-gray-600">
          Upload your CSV file to start generating insights and recommendations.
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-analytics-blue" />
              CSV File Upload
            </CardTitle>
            <CardDescription>
              Drag and drop your Superstore CSV file here, or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive 
                  ? 'border-analytics-blue bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your CSV file here
                  </p>
                  <p className="text-sm text-gray-500">
                    or <span className="text-analytics-blue font-medium">browse</span> to choose a file
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Supported format: CSV • Maximum size: 50MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Status */}
        {file && (
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isValid ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {isValid && (
                  <Button
                    onClick={handleAnalyze}
                    className="bg-analytics-blue hover:bg-blue-600 text-white"
                  >
                    Analyze Data
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <Card className="border-red-200 bg-red-50 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-900 mb-2">Upload Issues</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview */}
        {preview && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Data Preview</CardTitle>
              <CardDescription>
                First 5 rows of your dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {Object.keys(preview[0]).slice(0, 8).map((key) => (
                        <th key={key} className="text-left py-2 px-3 font-medium text-gray-900">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index} className="border-b">
                        {Object.values(row).slice(0, 8).map((value, colIndex) => (
                          <td key={colIndex} className="py-2 px-3 text-gray-600">
                            {String(value).length > 20 
                              ? String(value).substring(0, 20) + '...' 
                              : String(value)
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Requirements - Updated to show ALL columns */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Required Columns</CardTitle>
            <CardDescription className="text-blue-700">
              Your CSV file must contain all of these columns for proper analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {[
                'order id', 'order date', 'ship date', 'ship mode', 
                'customer id', 'customer name', 'segment', 'country', 
                'city', 'state', 'postal code', 'region', 
                'product id', 'category', 'sub-category', 'product name',
                'sales', 'quantity', 'discount', 'profit', 
                'days to ship', 'rating'
              ].map((column) => (
                <div key={column} className="flex items-center space-x-2 bg-white p-2 rounded border border-blue-200">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-blue-900 font-medium">{column}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Total: 22 columns required</strong> - Make sure your CSV file contains all these columns with the exact names shown above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
