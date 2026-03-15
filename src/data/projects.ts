import { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'mmqli',
    name: 'mmqli — MmQL Interpreter',
    status: 'in-progress',
    description: [
      'A lightweight cross-platform computational query language for real and complex numbers of arbitrary precision, written in C++20.',
      'Interprets MmQL (Mathematical Query Language) without building an AST — minimalistic syntax, case-sensitive, no CAS dependencies.',
    ],
    language: {
      mode: 'cpp-only',
      reason: 'Pure systems/interpreter project.',
    },
    repoUrl: 'https://github.com/mtalha-codes/mmqli',
    note: 'Currently paused — hardware failure (overheating). Refactor in progress. Will resume on new hardware.',
  },
  {
    id: 'black-scholes-pricer',
    name: 'black-scholes-pricer',
    status: 'planned',
    description: [
      'Analytical options pricer with binomial tree, full Greeks engine, pybind11 bridge, implied volatility surface, and delta-hedging sim.',
    ],
    language: {
      mode: 'mixed',
      cppPercent: 60,
      pythonPercent: 40,
    },
    repoUrl: 'https://github.com/muhammadtalha-quant/black-scholes-pricer',
  },
  {
    id: 'execution-aware-backtester',
    name: 'execution-aware-backtester',
    status: 'planned',
    description: [
      'Event-driven C++ backtesting engine with realistic transaction costs, slippage modeling, volatility-targeted risk module, pybind11 bridge.',
    ],
    language: {
      mode: 'mixed',
      cppPercent: 70,
      pythonPercent: 30,
    },
    repoUrl: 'https://github.com/muhammadtalha-quant/execution-aware-backtester',
  },
  {
    id: 'signal-discovery-pipeline',
    name: 'signal-discovery-pipeline',
    status: 'planned',
    description: [
      'Feature engineering and statistical alpha research pipeline — IC analysis, walk-forward validation, ML alpha, factor exposure.',
    ],
    language: {
      mode: 'python-only',
      reason: 'Pure research-facing project.',
    },
    repoUrl: 'https://github.com/muhammadtalha-quant/signal-discovery-pipeline',
  },
  {
    id: 'market-making-simulator',
    name: 'market-making-simulator',
    status: 'planned',
    description: [
      'LOB engine with Avellaneda-Stoikov optimal quoting, Ho-Stoll baseline, micro-price extension, PnL attribution analytics.',
    ],
    language: {
      mode: 'mixed',
      cppPercent: 40,
      pythonPercent: 60,
    },
    repoUrl: 'https://github.com/muhammadtalha-quant/market-making-simulator',
  },
  {
    id: 'paper-live-execution',
    name: 'paper-live-execution',
    status: 'planned',
    description: [
      'Broker API execution engine with risk layer, live paper-trading run, and implementation shortfall post-mortem analysis.',
    ],
    language: {
      mode: 'python-only',
      reason: 'Non-latency-sensitive LF execution layer.',
    },
    repoUrl: 'https://github.com/muhammadtalha-quant/paper-live-execution',
  },
]
