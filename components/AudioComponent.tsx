// components/MessageComponent.tsx
import { useState, FC } from 'react';
import { IoClose } from 'react-icons/io5';
// import types
import { MessageProps } from '@/lib/types';

interface AudioComponentProps {
    msg: MessageProps;
    deleteMessage: (id: string) => void;
    ghost?: string;
}

const AudioComponent: FC<AudioComponentProps> = (props) => {
    const { msg, deleteMessage, ghost } = props;

    return (
        <div className={`flex ${msg.isSelf ? 'justify-start' : 'justify-end'} w-full text-sm`}>
            <div className={`relative rounded ${msg.isSelf ? 'bg-[#563D7C] text-white border-white' : 'bg-white text-slate-700 border-slate-700'} overflow-hidden`}>
                <div className="flex flex-col p-3">
                    <p className='border-b capitalize'>
                        {msg.isSelf && 'True Self'}
                        {!msg.isSelf && ghost}:
                    </p>
                    <audio
                        src={msg.msgData}
                        controls
                        className='bg-gray-100 mt-1'
                    />
                    <div className="absolute right-0 top-0">
                        <IoClose className="cursor-pointer bg-red-500 text-white" onClick={() => deleteMessage(msg.id)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioComponent;
