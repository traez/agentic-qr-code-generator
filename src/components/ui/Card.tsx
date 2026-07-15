'use client'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  id?: string
}

export default function Card({ children, className = '', onClick, id }: CardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`border border-border rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
