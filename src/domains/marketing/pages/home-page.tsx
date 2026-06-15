// export default function HomePage() {
//    return (
//       <div className="container py-20">
//          <h1 className="text-5xl font-bold">
//             Build your business website in minutes
//          </h1>
//       </div>
//    )
// }

import { useHealth } from '@/shared/hooks/useHealth'

function HomePage() {
  const { data, isLoading, isError, error } = useHealth()

  return (
    <>
      <section id="center">
        <div className="hero">
          {/* <img src={heroImg} className="base" width="170" height="179" alt="" /> */}
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

export default HomePage
