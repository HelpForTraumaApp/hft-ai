'use client'

import React, { useState, useRef, useEffect } from 'react';
import TitleList from '@/components/dialogue/TitleList';
import ChatHistory from '@/components/dialogue/ChatHistory';
import ChatInput from '@/components/dialogue/ChatInput';
import EditModal from '@/components/modals/EditModal';
import DeleteModal from '@/components/modals/DeleteModal';

// import types
import { TitleProps, MessageProps } from '@/lib/types';

// Mock Datas
const titles: TitleProps[] = [
  {
    "id": "191lskdjfhl21h",
    "title": "Home Alone",
    "ghost": "partner"
  },
  {
    "id": "sdasd23rs1",
    "title": "Accident",
    "ghost": "murder"
  },
  {
    "id": "12bwetqsd",
    "title": "Relaxing",
    "ghost": "player"
  },
]
const mockMessages: MessageProps[] = [
  {
    id: '1',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'I will really practice this today! One thing at a time.',
    timeStamp: new Date('2024-08-05T09:30:00'),
  },
  {
    id: '2',
    titleId: '191lskdjfhl21h',
    isSelf: true,
    msgData: 'That helps!',
    timeStamp: new Date('2024-08-05T09:31:00'),
  },
  {
    id: '3',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'asdsd',
    timeStamp: new Date('2024-08-05T10:45:00'),
  },
  {
    id: '4',
    titleId: '191lskdjfhl21h',
    isSelf: true,
    msgData: 'good bye',
    timeStamp: new Date('2024-09-23T14:10:00'),
  },
  {
    id: '5',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'hello',
    timeStamp: new Date('2024-09-23T14:11:00'),
  },
  {
    id: '6',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'bye',
    timeStamp: new Date('2024-09-23T14:12:00'),
  },
  {
    id: '7',
    titleId: '191lskdjfhl21h',
    isSelf: true,
    msgData: 'good bye',
    timeStamp: new Date('2024-09-23T15:10:00'),
  },
  {
    id: '8',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'hello',
    timeStamp: new Date('2024-09-23T15:11:00'),
  },
  {
    id: '9',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'bye',
    timeStamp: new Date('2024-09-23T15:12:00'),
  },
  {
    id: '10',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'I will really practice this today! One thing at a time.',
    timeStamp: new Date('2024-09-23T16:30:00'),
  },
  {
    id: '11',
    titleId: '191lskdjfhl21h',
    isSelf: true,
    msgData: 'That helps!',
    timeStamp: new Date('2024-09-23T16:31:00'),
  },
  {
    id: '12',
    titleId: '191lskdjfhl21h',
    isSelf: false,
    msgData: 'asdsd',
    timeStamp: new Date('2024-09-23T16:32:00'),
  },
];

export const TextDialogue = () => {
  // For TitleList 
  const [selectedTitle, setSelectedTitle] = useState<TitleProps>(titles[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletModalOpen, setIsDeletModalOpen] = useState(false);
  const [titleToOperation, setTitleToOperation] = useState<TitleProps | undefined>();
  const handleSelectedTitle = (item: TitleProps) => {
    setSelectedTitle(item);
  }
  const handleEditTitle = (item: TitleProps) => {
    setTitleToOperation(item);
    setIsEditModalOpen(true);
  }
  const changeTitle = (updatedTitle: TitleProps) => {
    window.alert(updatedTitle.title);
    window.alert(updatedTitle.id);
  }
  const handleDeleteTitle = (item: TitleProps) => {
    setTitleToOperation(item);
    setIsDeletModalOpen(true);
  }
  const deleteTitle = (deleteTitle: TitleProps) => {
    window.alert(deleteTitle.id);
  }
  // For ChatHistory
  const [messages, setMessages] = useState<MessageProps[]>(mockMessages);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const deleteMessage = (id: string) => {
    window.alert(id);
  }
  const updateMessage = (id: string, updatedMessage: string) => {
    window.alert(id);
    window.alert(updatedMessage);
  }
  // For ChatInput
  const sendNewMessage = (isSelf: boolean, message: string) => {
    window.alert(isSelf);
    window.alert(message);
  };
  return (
    <div className="flex flex-col gap-4 w-full 2xl:w-1/2">
      <TitleList
        titles={titles}
        selectedTitle={selectedTitle}
        handleSelectedTitle={handleSelectedTitle}
        handleEditTitle={handleEditTitle}
        handleDeleteTitle={handleDeleteTitle}
      />
      <ChatHistory
        messages={messages}
        deleteMessage={deleteMessage}
        updateMessage={updateMessage}
        selectedTitleGhost={selectedTitle.ghost}
        chatEndRef={chatEndRef}
      />
      <ChatInput
        sendNewMessage={sendNewMessage}
        ghost={selectedTitle.ghost}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialTitle={titleToOperation}
        changeTitle={changeTitle}
      />
      <DeleteModal
        isOpen={isDeletModalOpen}
        onClose={() => setIsDeletModalOpen(false)}
        TargetTitle={titleToOperation}
        deleteTitle={deleteTitle}
      />
    </div>
  )
}
