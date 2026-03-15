import React from 'react'
import { profile } from '../../data/profile'

export const Nitch: React.FC = () => {
  return (
    <div className="my-4 flex flex-col md:flex-row gap-8">
      <div className="text-accent-amber font-bold">
        <pre className="text-[14px] leading-tight">
{`        ██████╗
       ██╔═══██╗
       ██║   ██║
       ██║▄▄ ██║
       ╚██████╔╝
        ╚══▀▀═╝`}
        </pre>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-1">
          <span className="text-accent-amber font-bold">{profile.promptUser}@{profile.promptHost}</span>
        </div>
        <div className="text-text-dim mb-2">───────────────────────────────</div>
        <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1">
          <span className="text-text-secondary">◆ Age</span>
          <span className="text-text-primary">: {profile.age}</span>
          
          <span className="text-text-secondary">◆ Location</span>
          <span className="text-text-primary">: {profile.location}</span>
          
          <span className="text-text-secondary">◆ Degree</span>
          <span className="text-text-primary">: {profile.degree}</span>
          
          <span className="text-text-secondary">◆ Stack</span>
          <span className="text-text-primary">: C++20 + Python 3.11</span>
          
          <span className="text-text-secondary">◆ Focus</span>
          <span className="text-text-primary">: Algo Dev & Quant Research</span>
          
          <span className="text-text-secondary">◆ Systems</span>
          <span className="text-text-primary">: C++ — engines, data structures</span>
          
          <span className="text-text-secondary">◆ Research</span>
          <span className="text-text-primary">: Python — signals, ML, risk</span>
          
          <span className="text-text-secondary">◆ Math</span>
          <span className="text-text-primary">: Stochastic calc, statistics, linear algebra, probability</span>
          
          <span className="text-text-secondary">◆ Targets</span>
          <span className="text-text-primary">: {profile.targets.join(' · ')}</span>
          
          <span className="text-text-secondary">◆ Building</span>
          <span className="text-text-primary">: See 'projects'</span>
        </div>
      </div>
    </div>
  )
}
