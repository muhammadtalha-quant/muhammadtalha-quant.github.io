import { SkillCategory } from '../types'

export const skills: {
  cpp: SkillCategory
  python: SkillCategory
  math: SkillCategory
} = {
  cpp: {
    name: 'C++ SYSTEMS',
    items: [
      {
        label: 'Data Structures',
        detail:
          'Arrays, heaps, hash maps, priority queues, segment trees, sorted containers',
      },
      {
        label: 'Algorithms',
        detail: 'Complexity analysis, sorting, DP, graph traversal',
      },
      {
        label: 'Modern C++',
        detail:
          'C++20, RAII, move semantics, smart pointers, templates, concepts, std::variant, std::optional, ranges, views',
      },
      {
        label: 'Concurrency',
        detail:
          'std::thread, std::jthread, atomics, mutexes, condition variables, lock-free patterns',
      },
      {
        label: 'Performance',
        detail:
          'Cache-friendly layouts (SoA/AoS), perf, Valgrind, AddressSanitizer, ThreadSanitizer, UBSanitizer',
      },
      { label: 'Build & Test', detail: 'CMake, Make, GoogleTest, GoogleBenchmark' },
      {
        label: 'Bridge',
        detail: 'pybind11 — C++ to Python with zero-copy where possible',
      },
      {
        label: 'Interpreter Dev',
        detail:
          'Lexer/parser design, query execution without AST, arbitrary precision arithmetic (Boost, GMP, MPFR)',
      },
    ],
  },
  python: {
    name: 'PYTHON RESEARCH',
    items: [
      {
        label: 'Numerical',
        detail: 'NumPy — vectorization, broadcasting, linear algebra',
      },
      {
        label: 'Data',
        detail:
          'pandas — time series, groupby, rolling, resample, Parquet I/O, multi-index',
      },
      { label: 'Statistics', detail: 'statsmodels — OLS, ARIMA, ADF; scipy.stats' },
      { label: 'ML', detail: 'scikit-learn, LightGBM, XGBoost, Optuna, SHAP' },
      { label: 'Visualization', detail: 'matplotlib, seaborn' },
      { label: 'Workflow', detail: 'Jupyter Lab, reproducible notebooks, yfinance' },
    ],
  },
  math: {
    name: 'MATHEMATICS',
    items: [
      {
        label: 'Proofs & Logic',
        detail: 'Formal proof techniques — direct, contrapositive, induction, set theory',
      },
      {
        label: 'Linear Algebra',
        detail: 'Vector spaces, eigenvalues, LU/QR/SVD, PCA, covariance matrices',
      },
      {
        label: 'Probability',
        detail: 'Combinatorics through LLN/CLT, Bayes, conditional expectation, distributions',
      },
      {
        label: 'Statistics',
        detail: 'OLS, hypothesis testing, IC, walk-forward, Bonferroni, multiple testing correction',
      },
      {
        label: 'Stochastic Calc',
        detail: "Itô's lemma, risk-neutral pricing, HJB equation, stochastic control",
      },
      {
        label: 'Derivatives',
        detail: 'Black-Scholes, Greeks, binomial trees, volatility surface',
      },
      { label: 'Time Series', detail: 'ARMA/GARCH, stationarity, cointegration, ADF' },
    ],
  },
}
