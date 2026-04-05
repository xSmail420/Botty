import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
          color: '#fff',
          cursor: 'pointer'
        }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
