import React, { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { useTypingLines } from '../../hooks/useTypingLines'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export const ProjectsHandler: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = profile.github.split('/').pop()
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        )
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data: GitHubRepo[] = await response.json()

        // Filter: C++ or Python as primary language
        const filtered = data.filter((repo) =>
          ['C++', 'Python'].includes(repo.language || '')
        )

        setRepos(filtered)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const { visibleCount } = useTypingLines(
    repos.map((r) => r.name),
    100
  )

  if (loading)
    return (
      <div className="text-text-dim italic my-4 px-2">
        Fetching projects from GitHub...
      </div>
    )

  if (error)
    return (
      <div className="text-accent-red my-4 px-2">
        Error: {error}. Please check connectivity or GitHub username.
      </div>
    )

  if (repos.length === 0)
    return (
      <div className="text-text-dim italic my-4 px-2">
        No C++ or Python projects found on GitHub profile.
      </div>
    )

  return (
    <div className="my-4 space-y-8 px-2">
      {repos.slice(0, visibleCount).map((repo) => (
        <div key={repo.id} className="max-w-3xl font-terminal">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-accent-green font-bold text-lg">
              {repo.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              {repo.language}
            </span>
          </div>

          <div className="mb-3">
            <p className="text-text-primary leading-relaxed">
              {repo.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-x-4 text-sm">
            <div className="text-text-secondary">Stats</div>
            <div className="text-text-primary">
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </div>

            <div className="text-text-secondary">Repository</div>
            <div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-purple hover:underline break-all"
              >
                {repo.html_url.replace('https://github.com/', 'gh://')}
              </a>
            </div>

            <div className="text-text-secondary">Updated</div>
            <div className="text-text-dim">
              {new Date(repo.updated_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
