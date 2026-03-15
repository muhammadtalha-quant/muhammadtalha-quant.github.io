import { HelmetProvider, Helmet } from 'react-helmet-async'
import { Terminal } from './components/Terminal'

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>Muhammad Talha — Algorithm Developer & Quant Researcher</title>
        </Helmet>
        <Terminal />
      </div>
    </HelmetProvider>
  )
}

export default App
