import React from 'react';

export function ConversationHeader() {
  return (
    <div className="bg-primary px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Event Assistant</h2>
          <p className="text-orange-100 text-sm">Ask me anything about events and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-orange-100 text-sm">Online</span>
        </div>
      </div>
    </div>
  );
}