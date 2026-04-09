import { useState } from 'react';
import { Copy as CopyIcon, Phone as PhoneIcon } from 'lucide-react';

export default function WidgetConfig() {
  const [toggles, setToggles] = useState({
    feedback: true,
    chatMode: true,
    textWhileCall: true,
    transcript: false,
    languageDropdown: false,
    muteButton: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('<elevenlabs-convai agent-id="agent_061kfab5b6fma91d7vqpy1"></elevenlabs-convai>');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Front Desk Receptionist</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Public
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Variables
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Enable Versioning
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900">
              Preview
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <span className="text-gray-600">⋯</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-gray-200 px-8">
          {[
            'Agent',
            'Workflow',
            'Knowledge Base',
            'Analysis',
            'Tools',
            'Tests',
            'Widget',
            'Security',
            'Advanced',
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-4 text-sm font-medium border-b-2 transition-all ${
                tab === 'Widget'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Widget</h2>

          {/* Setup and Embed Code */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Setup */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Setup</h3>
              <p className="text-gray-600 mb-4">Attach the widget on your website.</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <span>📚</span>
                Learn how to embed your voice agent anywhere
              </button>
            </div>

            {/* Embed Code */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Embed code</h3>
              <p className="text-gray-600 mb-4">
                Add the following snippet to the pages where you want the conversation widget to be.
              </p>
              <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm overflow-x-auto mb-3 border border-gray-700">
                &lt;elevenlabs-convai agent-id=&quot;agent_061kfab5b6fma91d7vqpy1&quot;&gt;&lt;/elevenlabs-convai&gt;
              </div>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
              >
                <CopyIcon size={16} />
                Copy
              </button>
            </div>
          </div>

          {/* Interface Configuration */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Interface</h3>
            <p className="text-gray-600 mb-6">Configure the parts of the widget interface.</p>

            <div className="space-y-4">
              {[
                {
                  key: 'feedback',
                  label: 'Feedback collection',
                  desc: 'Callers can rate their satisfaction from 1 to 5 and optionally leave a comment after the conversation.',
                },
                {
                  key: 'chatMode',
                  label: 'Chat (text-only) mode',
                  desc: '',
                },
                {
                  key: 'textWhileCall',
                  label: 'Send text while on call',
                  desc: '',
                },
                {
                  key: 'transcript',
                  label: 'Realtime transcript of the call',
                  desc: '',
                },
                {
                  key: 'languageDropdown',
                  label: 'Language dropdown',
                  desc: '',
                },
                {
                  key: 'muteButton',
                  label: 'Mute button',
                  desc: '',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.label}</p>
                    {item.desc && <p className="text-sm text-gray-600 mt-1">{item.desc}</p>}
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof typeof toggles)}
                    className={`ml-4 flex-shrink-0 relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      toggles[item.key as keyof typeof toggles]
                        ? 'bg-gray-900'
                        : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                        toggles[item.key as keyof typeof toggles]
                          ? 'translate-x-7'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Expanded Behavior */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Expanded behavior</h3>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg">
          <p className="text-sm font-medium text-gray-900">Need help?</p>
        </div>
        <button className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <PhoneIcon size={24} />
        </button>
      </div>
    </div>
  );
}
