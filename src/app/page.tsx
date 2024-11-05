import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Navbar from '@/components/Navbar'
import JobSearch from '@/components/JobSearch'
import Link from 'next/link'
import Image from 'next/image'

// 精选职位
const FEATURED_JOBS = [
  {
    id: 1,
    company: 'Apple',
    domain: 'apple.com',
    title: 'Senior Software Engineer',
    location: 'Cupertino, CA',
    salary: '$180,000 - $250,000',
    type: 'Full-time',
  },
  {
    id: 2,
    company: 'Tesla',
    domain: 'tesla.com',
    title: 'AI/ML Engineer',
    location: 'Austin, TX',
    salary: '$160,000 - $220,000',
    type: 'Full-time',
  },
  {
    id: 3,
    company: 'OpenAI',
    domain: 'openai.com',
    title: 'Research Scientist',
    location: 'San Francisco, CA',
    salary: '$200,000 - $300,000',
    type: 'Full-time',
  },
]

const COMPANIES = [
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Airbnb', domain: 'airbnb.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'SpaceX', domain: 'spacex.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
]

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Next Career Move
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with top companies and opportunities. Your dream job is just a search away.
          </p>
          <JobSearch />
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_JOBS.map(job => (
              <Link 
                key={job.id} 
                href={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={`https://logo.clearbit.com/${job.domain}`}
                    alt={`${job.company} logo`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{job.company}</h3>
                    <p className="text-gray-600">{job.location}</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                <p className="text-gray-600 mb-2">{job.salary}</p>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100K+</div>
              <div className="text-gray-600">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600">Successful Hires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Solutions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transform Your Hiring with AI-Powered Recruitment
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">AI-Driven Talent Matching</h3>
                    <p className="text-gray-600">
                      Our advanced AI algorithms analyze millions of data points to match your positions with the most qualified candidates, ensuring optimal fit for skills, experience, and culture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
                    <p className="text-gray-600">
                      Make data-driven hiring decisions with our predictive analytics, forecasting candidate success rates and reducing time-to-hire by up to 50%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Cost-Effective Solutions</h3>
                    <p className="text-gray-600">
                      Optimize your recruitment budget with our flexible pricing models and AI-enhanced efficiency, delivering premium talent at competitive rates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
                  Contact Sales
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  Get a customized solution for your organization
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Average Time-to-Hire</div>
                    <div className="text-green-600">-45%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Candidate Quality Score</div>
                    <div className="text-green-600">+60%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Cost per Hire</div>
                    <div className="text-green-600">-30%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Retention Rate</div>
                    <div className="text-green-600">+40%</div>
                  </div>
                </div>
                <div className="mt-8 text-sm text-gray-500">
                  *Based on average customer results
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Companies Hiring</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {COMPANIES.map(company => (
              <div 
                key={company.name}
                className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <Image
                  src={`https://logo.clearbit.com/${company.domain}`}
                  alt={`${company.name} logo`}
                  width={64}
                  height={64}
                  className="mx-auto mb-4 rounded-lg"
                />
                <div className="font-medium">{company.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of professionals who've found their dream jobs through Glint
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/register"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="bg-white text-black border border-black px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black w-full mt-20">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 items-center justify-items-center text-center">
            <div className="max-w-3xl">
              <p className="text-gray-400 text-lg mb-8">
                Glint is a leading AI-powered recruitment platform connecting talented professionals 
                with innovative companies worldwide.
              </p>
              <div className="h-px w-full bg-gray-800 my-8" />
              <div className="text-sm text-gray-500 space-y-4">
                <p>San Francisco, CA | contact@glintapp.com</p>
                <p>© 2023 Glint. All rights reserved.</p>
                <p>Privacy Policy • Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
