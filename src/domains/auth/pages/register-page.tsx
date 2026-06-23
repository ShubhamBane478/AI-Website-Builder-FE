import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { apiClient } from '@/infra/api/client'
import { tokenManager } from '@/infra/auth/token-manager'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function RegisterPage() {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; form?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  // Verification step state
  const [isVerifyStep, setIsVerifyStep] = useState(false)
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [verifyError, setVerifyError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<HTMLInputElement[]>([])

  // Focus tracking for icons
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validation = registerSchema.safeParse({ email, password, confirmPassword })
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string; confirmPassword?: string } = {}
      validation.error.errors.forEach((err) => {
        const path = err.path[0] as string
        fieldErrors[path as keyof typeof fieldErrors] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await apiClient.post('/auth/register', { email, password })
      const { accessToken } = response.data

      setToken(accessToken)
      tokenManager.set(accessToken)
      
      setIsVerifyStep(true)
    } catch (err: any) {
      console.error('Registration error:', err)
      const message = err.response?.data?.error?.message || 'Something went wrong during registration. Please try again.'
      setErrors({ form: message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1)
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifyError('')
    const code = verificationCode.join('')

    if (code.length < 6) {
      setVerifyError('Please enter all 6 digits')
      return
    }

    setIsVerifying(true)

    try {
      await apiClient.post('/auth/verify-email', { code })
      navigate('/dashboard')
    } catch (err: any) {
      console.warn('Verification endpoint error (or not implemented):', err)
      navigate('/dashboard')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVerifyStep ? (
        <motion.div 
          key="verify"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-left"
        >
          <div className="text-center mb-lg">
            <span className="material-symbols-outlined text-primary text-[48px] mb-xs animate-bounce">
              mark_email_read
            </span>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
              Verify Your Email
            </h2>
            <p className="text-body-md text-on-surface-variant">
              We sent a 6-digit code to <span className="text-on-surface font-semibold">{email}</span>
            </p>
          </div>

          {verifyError && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-md p-sm bg-error-container/10 border border-error/20 rounded-xl flex items-center gap-sm text-body-md text-error"
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
              <span>{verifyError}</span>
            </motion.div>
          )}

          <form onSubmit={handleVerifySubmit} className="space-y-lg">
            {/* 6-Digit input boxes */}
            <div className="flex gap-sm justify-between">
              {verificationCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    if (el) inputRefs.current[idx] = el
                  }}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-12 text-center text-headline-lg font-bold bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-200"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.01, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-sm shadow-md"
            >
              {isVerifying ? (
                <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>Verify Account</span>
              )}
            </motion.button>
          </form>

          <div className="text-center mt-lg border-t border-outline-variant/10 pt-md">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-on-surface-variant hover:text-on-surface hover:underline font-semibold transition-colors"
            >
              Skip verification for now
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="register"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="text-left"
        >
          <div className="text-center mb-lg">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
              Create Account
            </h2>
            <p className="text-body-md text-on-surface-variant">Sign up to build websites in under 5 minutes</p>
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

          <form onSubmit={handleRegisterSubmit} className="space-y-md">
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
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-xs">Password</label>
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
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password Input */}
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-xs">Confirm Password</label>
              <div className="relative">
                <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] transition-colors duration-200 ${confirmFocused ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                  lock_reset
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  placeholder="Repeat password"
                  disabled={isLoading}
                  className={`w-full bg-surface-container-lowest border ${errors.confirmPassword ? 'border-error/50 focus:border-error' : 'border-outline-variant/30 focus:border-primary'} rounded-xl pl-10 pr-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-error/10' : 'focus:ring-primary/10'} shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_4px_16px_rgba(173,198,255,0.08)] transition-all duration-200`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-error font-label-sm text-label-sm mt-xs flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[12px]">info</span>
                  {errors.confirmPassword}
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
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Redirect Link */}
          <div className="text-center mt-lg border-t border-outline-variant/10 pt-md">
            <p className="text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-secondary hover:underline font-semibold transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
