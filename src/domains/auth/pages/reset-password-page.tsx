import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { apiClient } from '@/infra/api/client'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; form?: string }>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Track focus states
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!token) {
      setErrors({ form: 'Invalid reset link. Reset token is missing from the URL.' })
      return
    }

    const validation = resetSchema.safeParse({ password, confirmPassword })
    if (!validation.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {}
      validation.error.errors.forEach((err) => {
        const path = err.path[0] as string
        fieldErrors[path as keyof typeof fieldErrors] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)

    try {
      await apiClient.post('/auth/reset-password', { token, newPassword: password })
      setIsSuccess(true)
    } catch (err: any) {
      console.error('Reset password error:', err)
      const message = err.response?.data?.error?.message || 'Failed to reset password. The reset link may have expired.'
      setErrors({ form: message })
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
            <span className="material-symbols-outlined text-primary text-[48px] mb-xs animate-bounce">
              lock_open
            </span>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-primary to-on-surface mb-xs tracking-tight">
              Password Reset
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Your password has been successfully updated. You can now log in using your new credentials.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/login')}
            className="w-full mt-lg py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl transition-all flex items-center justify-center gap-sm shadow-md"
          >
            <span>Go to Log In</span>
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
              Choose New Password
            </h2>
            <p className="text-body-md text-on-surface-variant">Set a secure password for your account</p>
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
            {/* Password Input */}
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-xs">New Password</label>
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
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-xs">Confirm New Password</label>
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
              className="w-full mt-lg py-3 bg-gradient-to-r from-primary to-secondary text-surface font-bold font-headline-md rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-sm shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></span>
                  <span>Resetting password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Redirect Link */}
          <div className="text-center mt-lg border-t border-outline-variant/10 pt-md">
            <Link to="/login" className="text-primary hover:text-secondary hover:underline font-semibold text-body-md transition-colors">
              Back to Log In
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
