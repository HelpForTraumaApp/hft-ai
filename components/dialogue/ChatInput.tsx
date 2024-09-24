// components/ChatInput.tsx
import { useState, FC } from 'react';
import { IoIosSend } from "react-icons/io";

type ChatInputProps = {
  sendNewMessage: (isSelf: boolean, message: string) => void;
  ghost: string;
};

const ChatInput: FC<ChatInputProps> = (props) => {
  const { sendNewMessage, ghost } = props;
  const [message, setMessage] = useState('');

  const handleSendMessage = (isSelf: boolean) => {
    if (message.trim()) {
      sendNewMessage(isSelf, message);
    }
  };

  return (
    <div className="grid grid-cols-2 justify-center gap-4">
      <div className='flex flex-col gap-1 w-full'>
        <p className=' capitalize'>true self</p>
        <div className='relative rounded overflow-hidden shadow-xl'>
          <textarea
            rows={1}
            className='w-full p-2 resize-y focus:outline-none pr-6'
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='absolute right-0 top-0 p-1 hover:bg-gray-300 cursor-pointer h-[calc(100%-14px)]'>
            <IoIosSend
              className=' text-slate-600 text-2xl'
              onClick={() =>handleSendMessage(true)}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <p className=' capitalize'>{ghost}</p>
        <div className='relative rounded overflow-hidden shadow-xl'>
          <textarea
            rows={1}
            className='w-full p-2 resize-y focus:outline-none pr-6'
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className='absolute right-0 top-0 p-1 hover:bg-gray-300 cursor-pointer h-[calc(100%-14px)]'>
            <IoIosSend
              className=' text-slate-600 text-2xl'
              onClick={() =>handleSendMessage(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
