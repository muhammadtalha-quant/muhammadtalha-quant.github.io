import type { Command, TerminalContext } from '../types'
import { WhoAmI } from './handlers/whoami'
import { Bio } from './handlers/bio'
import { Nitch } from './handlers/nitch'
import { ProjectsHandler } from './handlers/projects'
import { Skills } from './handlers/skills'
import { ContactsHandler } from './handlers/contacts'
import { Help, Reboot, GetCV, Shutdown } from './handlers/system'

export const createCommandRegistry = (): Command[] => {
  const registry: Command[] = [
    {
      name: 'whoami',
      aliases: [],
      description: 'Who I am and what I am building toward',
      category: 'identity',
      handler: () => {
        return <WhoAmI />
      },
    },
    {
      name: 'bio',
      aliases: [],
      description: 'Extended background and philosophy (Full View)',
      category: 'identity',
      handler: () => {
        return <Bio />
      },
    },
    {
      name: 'nitch',
      aliases: [],
      description: 'Display system info panel (Full View)',
      category: 'identity',
      handler: () => {
        return <Nitch />
      },
    },
    {
      name: 'projects',
      aliases: [],
      description: 'List all active projects (Full View)',
      category: 'work',
      handler: () => {
        return <ProjectsHandler filterType="featured" />
      },
    },
    {
      name: 'skills',
      aliases: [],
      description: 'Full technical skill matrix (Full View)',
      category: 'work',
      handler: () => {
        return <Skills />
      },
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
      description: 'Clear system output (usage: clear soft|hard)',
      category: 'system',
      handler: (args: string[], ctx: TerminalContext) => {
        if (args[0] === 'soft') {
          ctx.clearSoft()
          return (
            <div className="text-text-dim italic">
              Soft clearing outputs. Previous lines retained in history buffer.
            </div>
          )
        }
        ctx.clearHard()
        return (
          <div className="text-text-primary">
            Terminal cleared. Type 'help' to see available commands.
          </div>
        )
      },
    },
    {
      name: 'resume',
      aliases: ['last-session'],
      description:
        'Restore the keyboard history buffer from the previous session',
      category: 'system',
      handler: (_: string[], ctx: TerminalContext) => {
        ctx.resumeSession()
        return (
          <div className="text-acid italic">
            Session successfully linked to local memory. Press ↑ to navigate.
          </div>
        )
      },
    },
    {
      name: 'history',
      aliases: [],
      description: 'View command session memory status',
      category: 'system',
      handler: () => {
        return (
          <div className="text-text-dim">
            Command history synced to local storage. Max 100 entries.
          </div>
        )
      },
    },
    {
      name: 'help',
      aliases: [],
      description: 'Show manual and command index',
      category: 'system',
      handler: () => {
        return <Help registry={registry} />
      },
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
