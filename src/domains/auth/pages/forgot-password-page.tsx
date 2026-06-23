import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiClient } from '@/infra/api/client'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address')
})

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const validation = forgotSchema.safeParse({ email })
    if (!validation.success) {
      setError(validation.error.errors[0].message)
      return
    }

    setIsLoading(true)

    try {
      await apiClient.post('/auth/forgot-password', { email })
      setIsSuccess(true)
    } catch (err: any) {
      console.warn('Forgot password request error (or mock bypass):', err)
      // Enumeration protection fallback
      setIsSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-left"
        >
          <div className="text-center mb-lg">
            <span className="material-symbols-outlined text-primary text-[48px] mb-xs animate-pulse">
              send_and_archive
            </span>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
              Check Your Inbox
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              If an account exists for <span className="text-on-surface font-semibold">{email}</span>, you will receive a password reset link shortly.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/login')}
            className="w-full mt-lg py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl transition-all flex items-center justify-center gap-sm shadow-md"
          >
            <span>Return to Log In</span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          key="form"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-left"
        >
          <div className="text-center mb-lg">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
              Reset Password
            </h2>
            <p className="text-body-md text-on-surface-variant">We will email you a link to reset your password</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-md p-sm bg-error-container/10 border border-error/20 rounded-xl flex items-center gap-sm text-body-md text-error"
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
              <span>{error}</span>
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
                  className={`w-full bg-surface-container-lowest border ${error ? 'border-error/50 focus:border-error' : 'border-outline-variant/30 focus:border-primary'} rounded-xl pl-10 pr-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 ${error ? 'focus:ring-error/10' : 'focus:ring-primary/10'} shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_4px_16px_rgba(173,198,255,0.08)] transition-all duration-200`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-lg py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-sm shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending request...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Redirect Link */}
          <div className="text-center mt-lg border-t border-outline-variant/10 pt-md">
            <p className="text-body-md text-on-surface-variant">
              Remember your password?{' '}
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
