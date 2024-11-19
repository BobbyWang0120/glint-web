'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoImageProps {
  src?: string
  alt: string
  size?: number
}

export default function LogoImage({ src, alt, size = 40 }: LogoImageProps) {
  const [error, setError] = useState(false)
  
  // 生成默认的 UI Avatar URL
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    alt
  )}&background=0D8ABC&color=fff&size=${size * 2}`

  // 如果没有提供 src 或者加载失败，使用 fallback
  const imageUrl = (!src || error) ? fallbackUrl : `https://logo.clearbit.com/${src}`

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        className="rounded-lg object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
} 