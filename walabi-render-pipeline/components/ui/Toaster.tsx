'use client'

import * as Toast from '@radix-ui/react-toast'
import { create } from 'zustand'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ============================================================
// Toast state store
// ============================================================

interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error'
}

interface ToastStore {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 4000)
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

// Convenience helper — use anywhere
export function toast(opts: Omit<ToastMessage, 'id'>) {
  useToastStore.getState().addToast(opts)
}

// ============================================================
// Toaster component — place in layout
// ============================================================

export function Toaster() {
  const { toasts, removeToast } = useToastStore()

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((t) => (
        <Toast.Root
          key={t.id}
          open
          onOpenChange={(open) => { if (!open) removeToast(t.id) }}
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border',
            'bg-white data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
            'data-[state=open]:slide-in-from-top-full',
            t.variant === 'error' && 'border-red-200',
            t.variant === 'success' && 'border-emerald-200',
            (!t.variant || t.variant === 'default') && 'border-stone-200',
          )}
        >
          <div className="flex-1 min-w-0">
            <Toast.Title className="text-sm font-semibold text-stone-800">
              {t.title}
            </Toast.Title>
            {t.description && (
              <Toast.Description className="text-xs text-stone-500 mt-0.5">
                {t.description}
              </Toast.Description>
            )}
          </div>
          <Toast.Close
            onClick={() => removeToast(t.id)}
            className="text-stone-400 hover:text-stone-700 transition-colors mt-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </Toast.Close>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80 z-[9999]" />
    </Toast.Provider>
  )
}
