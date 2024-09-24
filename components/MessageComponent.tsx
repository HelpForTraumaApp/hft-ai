// components/MessageComponent.tsx
import { useState, FC } from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaSave } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
// import types
import { MessageProps } from '@/lib/types';

interface MsgComponentProps {
    msg: MessageProps;
    deleteMessage: (id: string) => void;
    updateMessage: (id: string, updatedMessage: string) => void;
    ghost: string;
}

const MessageComponent: FC<MsgComponentProps> = (props) => {
    const { msg, deleteMessage, updateMessage, ghost } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(msg.msgData);

    const handleUpdate = () => {
        updateMessage(msg.id, editedMessage);
        setIsEditing(false);
    };

    return (
        <div className={`flex ${msg.isSelf ? 'justify-start' : 'justify-end'} w-full text-sm`}>
            <div className={`relative w-4/5 rounded ${msg.isSelf ? 'bg-[#563D7C] text-white border-white' : 'bg-white text-slate-700 border-slate-700'} overflow-hidden`}>
                <div className="flex flex-col p-3">
                    <p className='border-b capitalize'>
                        {msg.isSelf && 'True Self'}
                        {!msg.isSelf && ghost}:
                    </p>
                    {isEditing ? (
                        <textarea
                            className={`p-1 border-slate-200 border focus:outline-none rounded-sm ${msg.isSelf ? 'bg-[#563D7C]' : 'bg-white'}`}
                            onChange={(e) => setEditedMessage(e.target.value)}
                        >
                            {editedMessage}
                        </textarea>
                    ) : (
                        <textarea
                            readOnly
                            className={`p-1 border-slate-500 border focus:outline-none rounded-sm ${msg.isSelf ? 'bg-[#563D7C]' : 'bg-white'}`}
                        >
                            {msg.msgData}
                        </textarea>
                    )}

                    <div className="absolute right-0 top-0">
                        <div className='flex flex-row'>
                            {isEditing ? (
                                <div className='p-1 bg-[#16c1fb]'>
                                    <FaSave className="cursor-pointer bg-[#16c1fb] text-white" onClick={handleUpdate} />
                                </div>
                            ) : (
                                <div className='p-1 bg-yellow-500'>
                                    <FiEdit className="cursor-pointer bg-yellow-500 text-white" onClick={() => setIsEditing(true)} />
                                </div>
                            )}
                            <div className='p-1 bg-red-500'>
                                {isEditing ? (
                                    <IoClose className="cursor-pointer bg-red-500 text-white" onClick={() => setIsEditing(false)} />
                                ) : (
                                    <IoClose className="cursor-pointer bg-red-500 text-white" onClick={() => deleteMessage(msg.id)} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageComponent;
