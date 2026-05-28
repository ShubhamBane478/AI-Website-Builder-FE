import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useHealth } from './shared/hooks/useHealth'

function App() {
  return <></>
  const { data, isLoading, isError, error } = useHealth()

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>AI Website Builder</h1>
        </div>

        <div className="health-card">
          <h2>Backend Health</h2>
          {isLoading && <p className="health-loading">Checking…</p>}
          {isError && (
            <p className="health-error">
              {error instanceof Error ? error.message : 'Unreachable'}
            </p>
          )}
          {data && (
            <table className="health-table">
              <tbody>
                <tr>
                  <td>Status</td>
                  <td className={data.status === 'UP' ? 'health-up' : 'health-down'}>
                    {data.status}
                  </td>
                </tr>
                <tr>
                  <td>Service</td>
                  <td>{data.service}</td>
                </tr>
                <tr>
                  <td>Environment</td>
                  <td>{data.environment}</td>
                </tr>
                <tr>
                  <td>Timestamp</td>
                  <td>{new Date(data.timestamp).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
