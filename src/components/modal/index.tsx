import { X } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  title: string
  isOpen: boolean
  closable?: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({
  title,
  isOpen,
  closable = true,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    if (closable) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [closable, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative flex w-full max-w-lg flex-col gap-3 rounded-lg bg-background-200 p-6 shadow-lg">
        <button
          onClick={onClose}
          className={`absolute right-2 top-2 text-gray-500 ${!closable && 'hidden'}`}
        >
          <X size={28} />
        </button>
        <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  )
}
