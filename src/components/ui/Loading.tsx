'use client'

interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export default function Loading({ text = '加载中...', fullScreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 加载动画 */}
      <div className="relative">
        {/* 外圈 */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        {/* 内圈（动画部分） */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      
      {/* 加载文字 */}
      {text && (
        <div className="text-gray-600 text-sm font-medium">{text}</div>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  )
} 