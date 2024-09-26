import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
// import types
import { TitleProps } from '@/lib/types';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: TitleProps;
  changeTitle: (updatedTitle: TitleProps) => void;
};

const EditModal: FC<EditModalProps> = (props) => {
  const { isOpen, onClose, initialTitle, changeTitle } = props;
  const [updatedTitle, setUpdatedTitle] = useState<TitleProps | undefined>(initialTitle);

  useEffect(() => {
    setUpdatedTitle(initialTitle);
  }, [initialTitle]);

  const handleSubmit = () => {
    if (updatedTitle) {
      changeTitle(updatedTitle);
    }
    onClose();
  };

  if (!isOpen || !updatedTitle) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start top-16 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-600">Edit Title</h2>
          <IoClose
            className='text-2xl text-gray-500 hover:text-gray-800 cursor-pointer'
            onClick={onClose}
          />
        </div>
        <input
          type="text"
          value={updatedTitle.title}
          onChange={(e) =>
            setUpdatedTitle({ ...updatedTitle, title: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-500"
          placeholder="Enter new title"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#16c1fb] text-white py-2 rounded hover:bg-[#40a1c2] uppercase"
        >
          {updatedTitle.id == "-1" &&
            "Add New Dialogue"
          }
          {updatedTitle.id != "-1" &&
            "Update Dialogue Name"
          }
        </button>
      </motion.div>
    </div>
  );
};

export default EditModal;
