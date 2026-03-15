import React from 'react'

export interface Command {
  name: string
  aliases: string[]
  description: string
  category: 'identity' | 'work' | 'contact' | 'system'
  handler: (args: string[]) => React.ReactNode | Promise<React.ReactNode>
}

export interface OutputEntry {
  id: string
  type: 'input' | 'output' | 'error' | 'system'
  content: React.ReactNode
  timestamp: Date
}

export interface SkillCategory {
  name: string
  items: SkillItem[]
}

export interface SkillItem {
  label: string
  detail: string
}

export interface Profile {
  name: string
  promptUser: string
  promptHost: string
  age: number
  location: string
  degree: string
  targets: string[]
  email: string
  github: string
  linkedin: string
  siteUrl: string
  resumeUrl: string
}
