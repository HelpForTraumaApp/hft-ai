// components/ChatHistory.tsx
import { useState, FC, ReactHTMLElement, ReactNode } from 'react';
import MessageComponent from '@/components/MessageComponent';
import { format } from 'date-fns';
// import types
import { MessageProps } from '@/lib/types';

interface ChatHistoryProps {
  messages: MessageProps[];
  deleteMessage: (id: string) => void;
  updateMessage: (id: string, updatedMessage: string) => void;
  selectedTitleGhost: string;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const groupMessagesByDate = (messages: MessageProps[]) => {
  const grouped: { [key: string]: MessageProps[] } = {};
  messages.forEach((msg) => {
    const date = format(new Date(msg.timeStamp), 'MMMM d, yyyy');
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(msg);
  });
  return grouped;
};

const ChatHistory: FC<ChatHistoryProps> = (props) => {
  const { messages, deleteMessage, updateMessage, selectedTitleGhost, chatEndRef } = props;
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col gap-4 overflow-auto max-h-[calc(100vh-380px)] p-2">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className='flex flex-row gap-6 items-center justify-center mb-4'>
            <div className='border border-slate-500 w-full'></div>
            <div className="text-center text-slate-600  w-full">{date}</div>
            <div className='border border-slate-500 w-full'></div>
          </div>
          <div className='flex flex-col gap-4'>
            {groupedMessages[date].map((msg) => (
              <MessageComponent
                key={msg.id}
                msg={msg}
                deleteMessage={deleteMessage}
                updateMessage={updateMessage}
                ghost={selectedTitleGhost}
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatHistory;
