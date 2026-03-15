import React from 'react'
import { Command } from '../types'
import { WhoAmI } from './handlers/whoami'
import { Bio } from './handlers/bio'
import { Nitch } from './handlers/nitch'
import { ProjectsHandler } from './handlers/projects'
import { Skills } from './handlers/skills'
import { ContactsHandler } from './handlers/contacts'
import { Help, Reboot, Wget } from './handlers/system'

export const createCommandRegistry = (clearHistory: () => void): Command[] => {
  const registry: Command[] = [
    {
      name: 'whoami',
      aliases: [],
      description: 'Who I am and what I am building toward',
      category: 'identity',
      handler: () => <WhoAmI />,
    },
    {
      name: 'bio',
      aliases: [],
      description: 'Extended background and philosophy',
      category: 'identity',
      handler: () => <Bio />,
    },
    {
      name: 'nitch',
      aliases: [],
      description: 'Display summarized bio as system info panel',
      category: 'identity',
      handler: () => <Nitch />,
    },
    {
      name: 'projects',
      aliases: [],
      description: 'List all projects',
      category: 'work',
      handler: () => <ProjectsHandler />,
    },
    {
      name: 'projects:done',
      aliases: [],
      description: 'Completed projects only',
      category: 'work',
      handler: () => <ProjectsHandler filter="done" />,
    },
    {
      name: 'projects:planned',
      aliases: [],
      description: 'Planned projects only',
      category: 'work',
      handler: () => <ProjectsHandler filter="planned" />,
    },
    {
      name: 'skills',
      aliases: [],
      description: 'Full technical skill matrix',
      category: 'work',
      handler: () => <Skills />,
    },
    {
      name: 'skills:cpp',
      aliases: [],
      description: 'C++ systems skills only',
      category: 'work',
      handler: () => <Skills category="cpp" />,
    },
    {
      name: 'skills:python',
      aliases: [],
      description: 'Python research skills only',
      category: 'work',
      handler: () => <Skills category="python" />,
    },
    {
      name: 'skills:math',
      aliases: [],
      description: 'Mathematical foundations only',
      category: 'work',
      handler: () => <Skills category="math" />,
    },
    {
      name: 'linkedin',
      aliases: [],
      description: 'Open LinkedIn profile in new tab',
      category: 'contact',
      handler: () => <ContactsHandler type="linkedin" />,
    },
    {
      name: 'gh',
      aliases: [],
      description: 'Open GitHub profile in new tab',
      category: 'contact',
      handler: () => <ContactsHandler type="gh" />,
    },
    {
      name: 'mail',
      aliases: [],
      description: 'Display email address',
      category: 'contact',
      handler: () => <ContactsHandler type="mail" />,
    },
    {
      name: 'mailto',
      aliases: [],
      description: 'Open mail client',
      category: 'contact',
      handler: () => <ContactsHandler type="mailto" />,
    },
    {
      name: 'help',
      aliases: [],
      description: 'Show this command list',
      category: 'system',
      handler: () => <Help registry={registry} />,
    },
    {
      name: 'clear',
      aliases: [],
      description: 'Clear terminal output',
      category: 'system',
      handler: () => {
        clearHistory()
        return (
          <div className="my-2">
            <p className="text-text-primary">Terminal cleared. Type 'help' to see available commands.</p>
          </div>
        )
      },
    },
    {
      name: 'reboot',
      aliases: [],
      description: 'Hard reload the entire page',
      category: 'system',
      handler: () => <Reboot />,
    },
    {
      name: 'wget',
      aliases: [],
      description: 'Download resume PDF',
      category: 'system',
      handler: (args) => <Wget args={args} />,
    },
  ]

  return registry
}
