'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const countRef = useRef(0)
  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [error])

  const handleReset = () => {
    countRef.current += 1
    reset()
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg text-text font-interface overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-error-bg blur-[100px]" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">
        <div className="relative mb-8">
          <div className="size-16 rounded-2xl bg-error-bg border border-error flex items-center justify-center mb-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-error"
            >
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl border border-error opacity-30 animate-[ping_1s_ease-out_infinite]" />
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-error" />
          <span className="font-display text-12 font-bold tracking-[0.15em] uppercase text-error">
            Runtime Error
          </span>
          <div className="h-px w-8 bg-error" />
        </div>

        <h1 className="font-display text-36 font-bold tracking-[-0.02em] leading-tight mb-4">
          Что-то пошло не так
        </h1>

        <p className="text-16 text-text-60 leading-relaxed mb-8">
          Произошла непредвиденная ошибка. Попробуй обновить страницу — обычно это помогает.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-2 bg-accent-custom text-white px-6 py-3 rounded-lg text-16 font-medium border-none cursor-pointer transition-all hover:bg-accent-hover active:bg-accent-active"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Попробовать снова
          </button>
          {path !== '/' && (
            <Link
              href="/"
              className="flex-1 text-12 flex items-center justify-center gap-2 bg-transparent text-text-60 px-6 py-3 rounded-lg text-16 font-medium border border-border no-underline transition-all hover:border-border-strong hover:text-text"
            >
              На главную
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
