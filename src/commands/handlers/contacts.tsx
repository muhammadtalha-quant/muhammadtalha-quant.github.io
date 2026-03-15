import React, { useEffect } from 'react'
import { profile } from '../../data/profile'

const LinkedInHandler: React.FC = () => {
  useEffect(() => {
    window.open(profile.linkedin, '_blank', 'noopener,noreferrer')
  }, [])
  return (
    <div className="my-2">
      <p className="text-text-primary">Opening LinkedIn...</p>
      <p className="text-accent-blue">→ {profile.linkedin}</p>
    </div>
  )
}

const GhHandler: React.FC = () => {
  useEffect(() => {
    window.open(profile.github, '_blank', 'noopener,noreferrer')
  }, [])
  return (
    <div className="my-2">
      <p className="text-text-primary">Opening GitHub...</p>
      <p className="text-accent-purple">→ {profile.github}</p>
    </div>
  )
}

const MailtoHandler: React.FC = () => {
  useEffect(() => {
    window.open(`mailto:${profile.email}`, '_self')
  }, [])
  return <div className="my-2 text-text-primary">Opening mail client...</div>
}

export const ContactsHandler: React.FC<{
  type: 'linkedin' | 'gh' | 'mailto'
}> = ({ type }) => {
  switch (type) {
    case 'linkedin':
      return <LinkedInHandler />
    case 'gh':
      return <GhHandler />
    case 'mailto':
      return <MailtoHandler />
    default:
      return null
  }
}
