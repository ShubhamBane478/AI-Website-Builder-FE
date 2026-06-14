import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        'rounded-lg bg-black px-4 py-2 text-white dark:bg-white dark:text-black',
        className
      )}
      {...props}
    />
  )
}
