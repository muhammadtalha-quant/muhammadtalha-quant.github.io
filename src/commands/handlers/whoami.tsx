import React from 'react'
import { profile } from '../../data/profile'

export const WhoAmI: React.FC = () => {
  return (
    <div className="my-4 font-terminal">
      <div className="text-accent-amber font-bold text-lg mb-1">
        ┌────────────────── IDENT: {profile.name} ──────────────────┐
      </div>
      <div className="flex flex-col gap-1 px-4">
        <div className="flex gap-4">
          <span className="text-text-secondary w-24">Location</span>
          <span className="text-text-primary">: {profile.location}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-text-secondary w-24">Age</span>
          <span className="text-text-primary">: {profile.age}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-text-secondary w-24">Degree</span>
          <span className="text-text-primary">: {profile.degree}</span>
        </div>

        <div className="my-2 border-t border-border opacity-30"></div>

        <div className="flex gap-4">
          <span className="text-text-secondary w-24">Primary</span>
          <span className="text-text-primary">
            : C++23 — systems, performance-critical code
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-text-secondary w-24">Research</span>
          <span className="text-text-primary">
            : Python 3.12 — data, signals, ML
          </span>
        </div>

        <div className="my-2 border-t border-border opacity-30"></div>

        <div className="flex flex-col gap-1">
          <span className="text-text-secondary">Targets:</span>
          <div className="pl-4">
            <div className="text-accent-green">◆ HRT — Algorithm Developer</div>
            <div className="text-accent-purple">
              ◆ Citadel Securities — QR (Market Making)
            </div>
            <div className="text-accent-blue">
              ◆ Two Sigma — QR (Strategy Development)
            </div>
          </div>
        </div>
      </div>
      <div className="text-accent-amber font-bold text-lg mt-1">
        └──────────────────────────────────────────────────────┘
      </div>
    </div>
  )
}
