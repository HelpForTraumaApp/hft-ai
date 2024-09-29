// components/ChatHistory.tsx
import { FC } from 'react';
import AudioComponent from '@/components/AudioComponent';
import { format } from 'date-fns';
// import types
import { MessageProps } from '@/lib/types';

interface AudioHistoryProps {
  messages: MessageProps[];
  deleteMessage: (id: string) => void;
  selectedTitleGhost?: string;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

const groupMessagesByDate = (messages: MessageProps[]) => {
  const grouped: { [key: string]: MessageProps[] } = {};
  {
    messages && (
      messages.forEach((msg) => {
        const date = format(new Date(msg.timeStamp), 'MMMM d, yyyy');
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(msg);
      })
    )
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
    });
  }
  return grouped;
};

const AudioHistory: FC<AudioHistoryProps> = (props) => {
  const { messages, deleteMessage, selectedTitleGhost, chatEndRef } = props;
  const groupedMessages = groupMessagesByDate(messages);
  return (
    <div className="flex flex-col gap-4 overflow-auto h-[calc(100vh-380px)] p-2">
      {messages && (
        Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <div className='flex flex-row gap-6 items-center justify-center mb-4'>
              <div className='border border-slate-500 w-full'></div>
              <div className="text-center text-slate-600  w-full">{date}</div>
              <div className='border border-slate-500 w-full'></div>
            </div>
            <div className='flex flex-col gap-4'>
              {groupedMessages[date].map((msg) => (
                <AudioComponent
                  key={msg.id}
                  msg={msg}
                  deleteMessage={deleteMessage}
                  ghost={selectedTitleGhost}
                />
              ))}
            </div>
          </div>
        ))
      )}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default AudioHistory;
