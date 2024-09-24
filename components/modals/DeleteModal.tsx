import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import types
import { TitleProps } from '@/lib/types';

type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    TargetTitle?: TitleProps;
    deleteTitle: (deletedTitle: TitleProps) => void;
};

const DeleteModal: FC<DeleteModalProps> = (props) => {
    const { isOpen, onClose, TargetTitle, deleteTitle } = props;

    const handleDelete = () => {
        if (TargetTitle) deleteTitle(TargetTitle);
        onClose();
    };

    if (!isOpen || !TargetTitle) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start top-16 z-50">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-1/4"
            >
                <div className="flex mb-5">
                    <h2 className="text-lg font-semibold text-slate-600">
                        Are you sure you want to delete {' '}
                        <span className='text-red-400'>
                            {TargetTitle.title}
                        </span>
                        {' '}?
                    </h2>
                </div>
                <div className='flex flex-row-reverse gap-2'>
                    <button
                        onClick={onClose}
                        className=" bg-slate-200 text-white hover:text-slate-700 px-4 py-2 rounded"
                    >
                        cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className=" bg-red-500 text-white hover:text-slate-700 px-4 py-2 rounded"
                    >
                        delete
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteModal;
