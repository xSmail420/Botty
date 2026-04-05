'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={32} className="text-gray-400" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Page not found</h2>
          <p className="text-gray-600 mt-3">
            The page you&apos;re looking for doesn&apos;t exist. Check the URL or go back to the dashboard.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard">
            <Button className="bg-black text-white hover:bg-gray-900 font-bold">
              Go to Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
