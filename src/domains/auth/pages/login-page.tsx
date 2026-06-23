import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { apiClient } from '@/infra/api/client'
import { tokenManager } from '@/infra/auth/token-manager'
import { z } from 'zod'
import { motion } from 'framer-motion'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export default function LoginPage() {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  
  // Track focus states to change icon colors dynamically
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message
        if (err.path[0] === 'password') fieldErrors.password = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const { accessToken } = response.data
      
      setToken(accessToken)
      tokenManager.set(accessToken)
      
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      const message = err.response?.data?.error?.message || 'Invalid email or password. Please try again.'
      setErrors({ form: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="text-left"
    >
      <div className="text-center mb-lg">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
          Welcome Back
        </h2>
        <p className="text-body-md text-on-surface-variant">Log in to manage your AI websites</p>
      </div>

      {errors.form && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-md p-sm bg-error-container/10 border border-error/20 rounded-xl flex items-center gap-sm text-body-md text-error shadow-[0_0_15px_rgba(255,180,171,0.05)]"
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
          <span>{errors.form}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-md">
        {/* Email Input */}
        <div>
          <label className="font-label-sm text-label-sm text-on-surface-variant block mb-xs">Email Address</label>
          <div className="relative">
            <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] transition-colors duration-200 ${emailFocused ? 'text-primary' : 'text-on-surface-variant/40'}`}>
              mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="name@company.com"
              disabled={isLoading}
              className={`w-full bg-surface-container-lowest border ${errors.email ? 'border-error/50 focus:border-error' : 'border-outline-variant/30 focus:border-primary'} rounded-xl pl-10 pr-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 ${errors.email ? 'focus:ring-error/10' : 'focus:ring-primary/10'} shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_4px_16px_rgba(173,198,255,0.08)] transition-all duration-200`}
            />
          </div>
          {errors.email && (
            <p className="text-error font-label-sm text-label-sm mt-xs flex items-center gap-xs">
              <span className="material-symbols-outlined text-[12px]">info</span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-xs">
            <label className="font-label-sm text-label-sm text-on-surface-variant block">Password</label>
            <Link to="/forgot-password" className="font-label-sm text-label-sm text-primary hover:text-secondary hover:underline transition-colors">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] transition-colors duration-200 ${passwordFocused ? 'text-primary' : 'text-on-surface-variant/40'}`}>
              lock
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="••••••••"
              disabled={isLoading}
              className={`w-full bg-surface-container-lowest border ${errors.password ? 'border-error/50 focus:border-error' : 'border-outline-variant/30 focus:border-primary'} rounded-xl pl-10 pr-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 ${errors.password ? 'focus:ring-error/10' : 'focus:ring-primary/10'} shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_4px_16px_rgba(173,198,255,0.08)] transition-all duration-200`}
            />
          </div>
          {errors.password && (
            <p className="text-error font-label-sm text-label-sm mt-xs flex items-center gap-xs">
              <span className="material-symbols-outlined text-[12px]">info</span>
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01, filter: 'brightness(1.08)' }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="w-full mt-lg py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></span>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Redirect Link */}
      <div className="text-center mt-lg border-t border-outline-variant/10 pt-md">
        <p className="text-body-md text-on-surface-variant">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-secondary hover:underline font-semibold transition-colors">
            Sign Up Free
          </Link>
        </p>
      </div>
    </motion.div>
  )
}