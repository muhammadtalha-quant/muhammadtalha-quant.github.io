import type { Command } from '../types'
import { WhoAmI } from './handlers/whoami'
import { Bio } from './handlers/bio'
import { Nitch } from './handlers/nitch'
import { ProjectsHandler } from './handlers/projects'
import { Skills } from './handlers/skills'
import { ContactsHandler } from './handlers/contacts'
import { Help, Reboot, GetCV, Shutdown } from './handlers/system'

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
      name: 'skills',
      aliases: [],
      description: 'Full technical skill matrix',
      category: 'work',
      handler: () => <Skills />,
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
      name: 'mailto',
      aliases: [],
      description: 'Open mail client',
      category: 'contact',
      handler: () => <ContactsHandler type="mailto" />,
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
            <p className="text-text-primary">
              Terminal cleared. Type 'help' to see available commands.
            </p>
          </div>
        )
      },
    },
    {
      name: 'help',
      aliases: [],
      description: 'Show this command list',
      category: 'system',
      handler: () => <Help registry={registry} />,
    },
    {
      name: 'get-cv',
      aliases: [],
      description: 'Download resume PDF',
      category: 'system',
      handler: () => <GetCV />,
    },
    {
      name: 'reboot',
      aliases: [],
      description: 'Restart the terminal session',
      category: 'system',
      handler: () => <Reboot />,
    },
    {
      name: 'shutdown',
      aliases: [],
      description: 'Shut down the terminal',
      category: 'system',
      handler: () => <Shutdown />,
    },
  ]

  return registry
}
