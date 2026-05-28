const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface HealthResponse {
  status: string
  service: string
  environment: string
  timestamp: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${BASE_URL}/api/health`)
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`)
  return res.json()
}
