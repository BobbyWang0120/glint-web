interface Candidate {
  id: number
  name: string
  avatar: string
}

interface Props {
  candidate: Candidate
}

export default function ChatPanel({ candidate }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-900">{candidate.name}</span>
        </div>
      </div>

      {/* 聊天记录 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* 这里可以添加聊天记录 */}
          <p className="text-gray-500 text-center text-sm">
            Start chatting with the candidate
          </p>
        </div>
      </div>

      {/* 输入框 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="输入消息..."
            className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            发送
          </button>
        </div>
      </div>
    </div>
  )
} 