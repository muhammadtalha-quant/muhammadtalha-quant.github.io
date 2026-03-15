import React from 'react'
import { profile } from '../../data/profile'

export const ContactsHandler: React.FC<{ type: 'linkedin' | 'gh' | 'mail' | 'mailto' }> = ({ type }) => {
  switch (type) {
    case 'linkedin':
      window.open(profile.linkedin, '_blank')
      return (
        <div className="my-2">
          <p className="text-text-primary">Opening LinkedIn...</p>
          <p className="text-accent-blue">→ {profile.linkedin}</p>
        </div>
      )
    case 'gh':
      window.open(profile.github, '_blank')
      return (
        <div className="my-2">
          <p className="text-text-primary">Opening GitHub...</p>
          <p className="text-accent-purple">→ {profile.github}</p>
        </div>
      )
    case 'mail':
      return (
        <div className="my-2">
          <p className="text-text-primary">Email: <span className="text-accent-amber">{profile.email}</span></p>
          <p className="text-text-secondary mt-1">Run 'mailto' to open your mail client.</p>
        </div>
      )
    case 'mailto':
      window.open(`mailto:${profile.email}`)
      return <div className="my-2 text-text-primary">Opening mail client...</div>
    default:
      return null
  }
}
