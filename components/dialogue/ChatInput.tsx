// components/ChatInput.tsx
import { useState, FC } from 'react';
import { IoIosSend } from "react-icons/io";
import { FiEdit } from 'react-icons/fi';

type ChatInputProps = {
  sendNewMessage: (isSelf: boolean, message: string) => void;
  ghost?: string;
  updateGhost: (ghost: string) => void;
};

const ChatInput: FC<ChatInputProps> = (props) => {
  const { sendNewMessage, ghost, updateGhost } = props;
  const [messageSelf, setMessageSelf] = useState('');
  const [messageGhost, setMessageGhost] = useState('');
  const [ghostUpdate, setGhostUpdate] = useState(false);
  const [tempGhost, setTempGhost] = useState('');

  const handleSendMessage = (isSelf: boolean) => {
    if (isSelf) {
      sendNewMessage(isSelf, messageSelf);
    } else {
      sendNewMessage(isSelf, messageGhost);
    }
  };

  const handleGhostName = () => {
    if (tempGhost.trim() == '') {
      setGhostUpdate(!ghostUpdate);
    } else {
      updateGhost(tempGhost);
      setGhostUpdate(!ghostUpdate);
    }
  }

  return (
    <div className="flex flex-row justify-center gap-4">
      <div className='flex flex-col gap-1 w-full'>
        <p className=' capitalize'>true self</p>
        <div className='relative rounded overflow-hidden shadow-xl'>
          <textarea
            rows={1}
            defaultValue=''
            className='w-full p-2 resize-y focus:outline-none pr-6'
            onChange={(e) => setMessageSelf(e.target.value)}
          />
          <div className='absolute right-0 top-0 p-1 hover:bg-gray-300 cursor-pointer h-[calc(100%-14px)]'>
            <IoIosSend
              className=' text-slate-600 text-2xl'
              onClick={() => handleSendMessage(true)}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        {ghostUpdate && (
          <div className='flex flex-row gap-2 -m-[1px]'>
            <input
              className=' px-2 focus:outline-none border border-slate-400 rounded'
              onChange={(e) => setTempGhost(e.target.value)}
            />
            <button
              className='rounded bg-[#16c1fb] hover:bg-gray-300 px-2'
              onClick={handleGhostName}
            >update
            </button>
          </div>
        )}
        {!ghostUpdate && (
          <p className=' capitalize'>{ghost ? ghost : 'undefined'}</p>
        )}
        <div className='relative rounded overflow-hidden shadow-xl'>
          <textarea
            rows={1}
            defaultValue=''
            className='w-full p-2 resize-y focus:outline-none pr-6'
            onChange={(e) => setMessageGhost(e.target.value)}
          />
          <div className='absolute right-0 top-0 p-1 hover:bg-gray-300 cursor-pointer h-[calc(100%-14px)]'>
            <IoIosSend
              className=' text-slate-600 text-2xl'
              onClick={() => handleSendMessage(false)}
            />
          </div>
        </div>
      </div>
      <div className='flex items-end justify-end'>
        <div
          className={`h-fit p-3 rounded cursor-pointer ${ghostUpdate ? 'bg-green-700' : 'bg-[#16c1fb]'}`}
          onClick={() => (setGhostUpdate(!ghostUpdate))}
        >
          <FiEdit className={`${ghostUpdate ? 'bg-green-700' : 'bg-[#16c1fb]'} text-white text-2xl`} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
