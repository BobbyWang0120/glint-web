const COMPANIES = [
  { name: 'Apple', domain: 'apple.com', locations: ['CA', 'TX', 'WA'] },
  { name: 'Google', domain: 'google.com', locations: ['CA', 'NY', 'WA'] },
  { name: 'Microsoft', domain: 'microsoft.com', locations: ['WA', 'CA', 'TX'] },
  { name: 'Amazon', domain: 'amazon.com', locations: ['WA', 'TX', 'NY'] },
  { name: 'Meta', domain: 'meta.com', locations: ['CA', 'NY', 'WA'] },
  { name: 'Netflix', domain: 'netflix.com', locations: ['CA', 'TX'] },
  { name: 'Tesla', domain: 'tesla.com', locations: ['TX', 'CA', 'NV'] },
  { name: 'SpaceX', domain: 'spacex.com', locations: ['TX', 'CA', 'FL'] },
  { name: 'Uber', domain: 'uber.com', locations: ['CA', 'NY', 'IL'] },
  { name: 'Airbnb', domain: 'airbnb.com', locations: ['CA', 'WA', 'NY'] }
]

const JOB_TITLES = [
  'Senior Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'DevOps Engineer',
  'Full Stack Developer',
  'Machine Learning Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Cloud Architect',
  'Mobile Developer',
  'Systems Engineer',
  'Technical Lead',
  'Engineering Manager',
  'QA Engineer'
]

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']

export function generateMockJobs(count: number, keyword?: string, location?: string) {
  const jobs = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)]
    const title = JOB_TITLES[Math.floor(Math.random() * JOB_TITLES.length)]
    const type = JOB_TYPES[Math.floor(Math.random() * JOB_TYPES.length)]
    const companyLocation = company.locations[Math.floor(Math.random() * company.locations.length)]
    const minSalary = Math.floor(Math.random() * 100 + 100) * 1000
    const maxSalary = minSalary + Math.floor(Math.random() * 50 + 20) * 1000
    const daysAgo = Math.floor(Math.random() * 30)
    const postedDate = new Date(today)
    postedDate.setDate(postedDate.getDate() - daysAgo)

    // 如果提供了搜索条件，确保生成的数据匹配条件
    if (keyword && !title.toLowerCase().includes(keyword.toLowerCase())) {
      i--
      continue
    }
    if (location && companyLocation !== location) {
      i--
      continue
    }

    jobs.push({
      id: i + 1,
      title,
      company: company.name,
      companyLogo: company.domain,
      location: companyLocation,
      salary: `$${(minSalary/1000).toFixed(0)}k - $${(maxSalary/1000).toFixed(0)}k`,
      type,
      description: `Join our team as a ${title} and help build the future of technology...`,
      requirements: '5+ years of relevant experience...',
      postedAt: postedDate.toISOString(),
    })
  }

  return jobs
} 