import { Modal } from './modal'

interface DeleteModalProps {
  onClose: () => void
  handleSubmit: () => void
}
export const DeleteStoryModal = ({
  onClose,
  handleSubmit
}: DeleteModalProps) => {
  return (
    <Modal onClose={onClose} title="">
      <div className="px-4">
        <p className="flex justify-start text-lg mb-4">
          Are you sure you want to delete this page?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-[#f8f9fa] py-2 px-4 rounded-md hover:bg-[#e2e6ea] duration-200"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className="bg-[#dc3545] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#c82333] duration-200"
            onClick={handleSubmit}
          >
            DELETE
          </button>
        </div>
      </div>
    </Modal>
  )
}
