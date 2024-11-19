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
  resumeUrl: string
}

interface Props {
  candidate: Candidate
}

export default function CandidateDetail({ candidate }: Props) {
  return (
    <div className="p-6">
      {/* Basic Information */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
          <p className="text-gray-600">{candidate.title}</p>
        </div>
      </div>

      {/* Resume Download */}
      <div className="mb-6">
        <a
          href={candidate.resumeUrl}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </a>
      </div>

      {/* Detailed Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-sm text-gray-900">{candidate.experience}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Education</p>
              <p className="text-sm text-gray-900">{candidate.education}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-sm text-gray-900">{candidate.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Applied Date</p>
              <p className="text-sm text-gray-900">
                {new Date(candidate.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Application Status</h3>
          <span className={`
            px-2 py-1 text-sm rounded-full
            ${candidate.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${candidate.status === 'INTERVIEWING' ? 'bg-blue-100 text-blue-800' : ''}
          `}>
            {candidate.status}
          </span>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              JavaScript
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Node.js
            </span>
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Work Experience</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Senior Frontend Developer</p>
              <p className="text-sm text-gray-600">Previous Company • 2020 - Present</p>
              <p className="text-sm text-gray-500 mt-1">
                Led frontend development team, implemented new features and improved performance.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Frontend Developer</p>
              <p className="text-sm text-gray-600">Another Company • 2018 - 2020</p>
              <p className="text-sm text-gray-500 mt-1">
                Developed and maintained multiple web applications using React.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 