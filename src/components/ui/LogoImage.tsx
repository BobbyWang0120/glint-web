'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoImageProps {
  src: string
  alt: string
  size?: number
}

export default function LogoImage({ src, alt, size = 48 }: LogoImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-gray-400 text-xs">{alt[0]}</span>
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-lg object-contain"
        onError={() => setError(true)}
      />
    </div>
  )
} 