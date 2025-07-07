import React, { useState } from "react"

export const Dialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const DialogTrigger: React.FC<{ asChild?: boolean, children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

interface DialogContentProps {
  children: React.ReactNode
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
