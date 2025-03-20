import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ChatPanel from '@/components/Chat/ChatPanel';
import OutputPanel from '@/components/Chat/OutputPanel';
import Navbar from '../components/Navbar';

const ChatPage = () => {
  return (
    <div className="h-screen flex flex-col bg-schema-dark text-white overflow-hidden">
      {/* Navbar */}
      <div className="flex-shrink-0">
        <Navbar />
      </div>

      {/* ResizablePanelGroup with constrained height */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex w-full h-full"
        >
          {/* Left Panel */}
          <ResizablePanel defaultSize={40} minSize={30} className="bg-schema-dark">
            <ChatPanel />
          </ResizablePanel>

          {/* Resizable Handle */}
          <ResizableHandle withHandle />

          {/* Right Panel */}
          <ResizablePanel defaultSize={60} minSize={40} className="overflow-auto">
            <OutputPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatPage;