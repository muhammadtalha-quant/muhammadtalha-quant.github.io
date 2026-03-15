import React from 'react'
import { profile } from '../../data/profile'

export const WhoAmI: React.FC = () => {
  return (
    <div className="my-2">
      <div className="border border-border p-4 inline-block rounded-sm bg-bg-secondary">
        <div className="flex flex-col gap-1">
          <div className="text-accent-amber font-bold text-lg border-b border-border pb-1 mb-2">
            ┌──────────────────────────────────────────────────────┐
          </div>
          <div className="flex gap-4">
            <span className="text-text-primary w-24">Name</span>
            <span className="text-text-primary">: {profile.name}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-text-secondary w-24">Role</span>
            <span className="text-accent-blue">: Algorithm Developer & Quantitative Researcher</span>
          </div>
          <div className="my-2 border-t border-border opacity-30"></div>
          <div className="flex gap-4">
            <span className="text-text-secondary w-24">Age</span>
            <span className="text-text-primary">: {profile.age}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-text-secondary w-24">Location</span>
            <span className="text-text-primary">: {profile.location}</span>
          </div>
          <div className="my-2 border-t border-border opacity-30"></div>
          <div className="flex gap-4">
            <span className="text-text-secondary w-24">Primary</span>
            <span className="text-text-primary">: C++ — systems, performance-critical code</span>
          </div>
          <div className="flex gap-4">
            <span className="text-text-secondary w-24">Research</span>
            <span className="text-text-primary">: Python — data, signals, ML</span>
          </div>
          <div className="my-2 border-t border-border opacity-30"></div>
          <div className="flex flex-col gap-1">
            <span className="text-text-secondary">Targets  :</span>
            <div className="pl-4">
              <div className="text-accent-green">◆ HRT — Algorithm Developer</div>
              <div className="text-accent-purple">◆ Citadel Securities — QR (Market Making)</div>
              <div className="text-accent-blue">◆ Two Sigma — QR (Strategy Development)</div>
            </div>
          </div>
          <div className="flex gap-4 mt-1">
            <span className="text-text-dim w-24">Fallback</span>
            <span className="text-text-dim">: Independent LF Systematic Trader</span>
          </div>
          <div className="text-accent-amber font-bold text-lg border-t border-border pt-1 mt-2">
            └──────────────────────────────────────────────────────┘
          </div>
        </div>
      </div>
    </div>
  )
}
