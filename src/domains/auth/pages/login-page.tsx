export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Welcome back to SiteForge
        </p>
      </div>

      <form className="space-y-4">
        <input
          className="w-full rounded-lg border px-4 py-3"
          placeholder="Email"
        />

        <input
          className="w-full rounded-lg border px-4 py-3"
          placeholder="Password"
          type="password"
        />

        <button className="w-full rounded-lg bg-primary py-3 text-primary-foreground">
          Login
        </button>
      </form>
    </div>
  )
}