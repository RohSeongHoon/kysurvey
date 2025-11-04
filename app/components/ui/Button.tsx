"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary"
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
    secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}
