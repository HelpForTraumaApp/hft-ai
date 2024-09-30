'use client'

import React, { useState, useRef, useEffect } from 'react';
import TitleList from '@/components/dialogue/TitleList';
import AudioHistory from '@/components/dialogue/AudioHistory';
import AudioRecorder from '@/components/dialogue/AudioRecorder';
import EditModal from '@/components/modals/EditModal';
import DeleteModal from '@/components/modals/DeleteModal';
// import types
import { TitleProps, MessageProps } from '@/lib/types';

export const AudioDialogue = () => {
  // For TitleList  
  const [titles, setTitles] = useState<TitleProps[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<TitleProps | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeletModalOpen, setIsDeletModalOpen] = useState(false);
  const [titleToOperation, setTitleToOperation] = useState<TitleProps | undefined>();
  // For ChatHistory
  const [messages, setMessages] = useState<MessageProps[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)
  // Initial Components
  const fetchDialogueTitles = async (isCreate: boolean) => {
    const is_text = 'false';
    const response = await fetch(`/api/dialogueTitle?is_text=${is_text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      setTitles(await data.data)
      if (!isCreate) setSelectedTitle(await data.data[0])
    } else {
      console.error('Failed to fetch dialogue titles.')
    }
  };
  const fetchMessages = async (title_id: string) => {
    const response = await fetch(`/api/audiomessage?title_id=${title_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok) {
      setMessages(await data.data)
    } else {
      console.error('Failed to fetch dialogue titles.')
    }
  }
  useEffect(() => {
    fetchDialogueTitles(false);
  }, []);
  useEffect(() => {
    if (selectedTitle) fetchMessages(selectedTitle.id)
  }, [selectedTitle])
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  // For TitleList Functions
  const handleSelectedTitle = (item: TitleProps) => {
    setSelectedTitle(item)
  }
  const handleEditTitle = (item: TitleProps) => {
    setTitleToOperation(item)
    setIsEditModalOpen(true)
  }
  const changeTitle = async (updatedTitle: TitleProps) => {
    const ghost = updatedTitle.ghost;
    const title = updatedTitle.title;

    if (updatedTitle.id == "-1") {
      const is_text = 'false';
      const response = await fetch('/api/dialogueTitle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ghost, title, is_text }),
      });
      const data = await response.json()
      if (data.result) {
        fetchDialogueTitles(true)
        setSelectedTitle(await data.result)
      } else {
      }
    } else {
      const response = await fetch('/api/dialogueTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTitle)
      })

      const data = await response.json()
      if (data.result == 0) {
        fetchDialogueTitles(true)
      } else {
      }
    }
  }
  const handleDeleteTitle = (item: TitleProps) => {
    setTitleToOperation(item)
    setIsDeletModalOpen(true)
  }
  const deleteTitle = async (deleteTitle: TitleProps) => {
    const id = deleteTitle.id
    const response = await fetch('/api/dialogueTitle', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

    const data = await response.json()
    if (data.result) {
      fetchDialogueTitles(true)
    } else {
    }
  }
  // For ChatHistory Functions
  const deleteMessage = async (id: string) => {
    const response = await fetch('/api/audiomessage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

    const data = await response.json()
    if (data.data && selectedTitle) {
      fetchMessages(selectedTitle.id)
    } else {
    }
  }
  // For Audio Functions
  const sendNewMessage = async (isSelf: boolean, message: string) => {
    const title_id = selectedTitle?.id
    const response = await fetch('/api/audiomessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title_id, isSelf, message })
    })

    const data = await response.json()
    if (data.data && title_id) {
      fetchMessages(title_id);
    } else {
    }
  }
  const updateGhost = async (ghost: string) => {
    if (selectedTitle) {
      let updatedTitle = selectedTitle
      updatedTitle.ghost = ghost
      const response = await fetch('/api/dialogueTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTitle)
      })

      const data = await response.json()
      if (data.result == 0) {
        fetchDialogueTitles(true)
      } else {
      }
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full 2xl:w-2/3">
      <TitleList
        titles={titles}
        selectedTitle={selectedTitle}
        handleSelectedTitle={handleSelectedTitle}
        handleEditTitle={handleEditTitle}
        handleDeleteTitle={handleDeleteTitle}
      />
      <AudioHistory
        messages={messages}
        deleteMessage={deleteMessage}
        selectedTitleGhost={selectedTitle?.ghost}
        chatEndRef={chatEndRef}
      />
      <AudioRecorder
        sendNewMessage={sendNewMessage}
        ghost={selectedTitle?.ghost}
        updateGhost={updateGhost}
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
