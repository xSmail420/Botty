'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, LogOut, Shield, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    organization: 'ElevenLabs',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 font-bold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300 bg-white text-gray-900"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-bold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className="border-gray-300 bg-white text-gray-900"
                />
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <Label htmlFor="org" className="text-gray-900 font-bold">
                  Organization
                </Label>
                <Input
                  id="org"
                  type="text"
                  value={profile.organization}
                  onChange={(e) => setProfile((prev) => ({ ...prev, organization: e.target.value }))}
                  className="border-gray-300 bg-white text-gray-900"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center gap-4 pt-4">
                <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-900 font-bold gap-2">
                  <Save size={18} /> Save Changes
                </Button>
                {saved && <span className="text-sm text-green-600 font-medium">✓ Saved successfully</span>}
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield size={24} /> Security
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-600">Update your password regularly for security</p>
                </div>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Update
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">Active Sessions</p>
                  <p className="text-sm text-gray-600">Manage your active login sessions</p>
                </div>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  View
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bell size={24} /> Notifications
            </h2>

            <div className="space-y-4">
              {[
                { label: 'Email Notifications', desc: 'Receive updates about your agents and usage' },
                { label: 'Activity Alerts', desc: 'Get notified about important account activities' },
                { label: 'Newsletter', desc: 'Subscribe to our weekly newsletter' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" defaultChecked={i === 0} />
                </div>
              ))}
            </div>
          </div>

          {/* Billing Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Plan</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">Current Plan: Pro</p>
                  <p className="text-sm text-gray-600">$99/month • Next billing date: May 1, 2024</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-900 font-bold">
                  Manage Billing
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">Usage</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">API Calls</span>
                    <span className="font-bold text-gray-900">45,234 / 100,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-black rounded-full h-2 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe size={24} /> Organization
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">Organization Members</p>
                  <p className="text-sm text-gray-600">Manage team members and permissions</p>
                </div>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-bold text-gray-900">API Keys</p>
                  <p className="text-sm text-gray-600">Create and manage API keys for integrations</p>
                </div>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  View Keys
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border-2 border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>

            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-bold text-gray-900">Delete Account</p>
                <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>

          {/* Logout */}
          <div className="flex">
            <Button variant="outline" className="border-gray-300 text-red-600 hover:bg-red-50 gap-2">
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
