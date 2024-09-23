import { ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  title: string
  children: ReactNode | ReactNode[]
}

export const Modal = ({ onClose, title, children }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-top">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center">{title}</h2>
          <div className="modal-content-panel">{children}</div>
        </div>
      </div>
    </div>
  )
}
