import { useTheme } from '@/app/providers/theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface transition-all duration-200 active:scale-95 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="material-symbols-outlined text-[20px] text-tertiary">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-[20px] text-primary">dark_mode</span>
      )}
    </button>
  )
}
