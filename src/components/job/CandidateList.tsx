interface Candidate {
  id: number
  name: string
  title: string
  experience: string
  education: string
  location: string
  status: string
  appliedAt: string
  avatar: string
  aiScore: number
}

interface Props {
  candidates: Candidate[]
  selectedId: number
  onSelect: (candidate: Candidate) => void
}

export default function CandidateList({ candidates, selectedId, onSelect }: Props) {
  return (
    <div className="divide-y divide-gray-200">
      {candidates.map(candidate => (
        <div
          key={candidate.id}
          className={`p-4 cursor-pointer transition-colors
            ${selectedId === candidate.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          onClick={() => onSelect(candidate)}
        >
          <div className="flex items-center space-x-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {candidate.name}
                </p>
                <div className="flex items-center">
                  <span className={`
                    px-2 py-1 text-xs rounded-full font-medium
                    ${candidate.aiScore >= 90 ? 'bg-green-100 text-green-800' : ''}
                    ${candidate.aiScore >= 80 && candidate.aiScore < 90 ? 'bg-blue-100 text-blue-800' : ''}
                    ${candidate.aiScore < 80 ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {candidate.aiScore}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 truncate">{candidate.title}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Applied on {new Date(candidate.appliedAt).toLocaleDateString()}
                </p>
                <span className={`
                  px-2 py-0.5 text-xs rounded-full
                  ${candidate.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${candidate.status === 'INTERVIEWING' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                  {candidate.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 