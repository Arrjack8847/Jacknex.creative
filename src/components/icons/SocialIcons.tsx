import type { SVGProps } from 'react'

interface SocialIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function TelegramIcon({ size = 18, ...props }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.4 4.8 17.2 19c-.2.9-.8 1.1-1.5.7l-4.2-3.1-2 1.9c-.2.2-.4.4-.8.4l.3-4.4 8-7.2c.3-.3-.1-.5-.5-.2l-9.9 6.2-4.3-1.4c-.9-.3-.9-.9.2-1.3l16.8-6.5c.8-.3 1.5.2 1.2 1.7Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ViberIcon({ size = 18, ...props }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.7 4.5h8.6A3.7 3.7 0 0 1 20 8.2v5.9a3.7 3.7 0 0 1-3.7 3.7h-3.7l-3.4 2.7v-2.7H7.7A3.7 3.7 0 0 1 4 14.1V8.2a3.7 3.7 0 0 1 3.7-3.7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.3 8.5c.2-.2.6-.3.9-.1l1.1 1.2c.2.2.2.5.1.8l-.4.7c.5.9 1.2 1.6 2.1 2.1l.7-.4c.3-.1.6-.1.8.1l1.2 1.1c.2.3.2.7-.1.9-.4.4-.9.7-1.4.7-2.8-.2-5.2-2.6-5.4-5.4 0-.5.3-1 .7-1.4Z"
        fill="currentColor"
      />
      <path
        d="M13.3 7.9c1.4.3 2.4 1.4 2.7 2.7M13.1 6.3c2.3.3 4.1 2.1 4.4 4.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function FacebookIcon({ size = 18, ...props }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.2 8.1h2.2V4.6c-.4-.1-1.6-.2-3-.2-3 0-5 1.8-5 5.2v2.9H5.7v3.9h2.7v7h4.1v-7h3.2l.5-3.9h-3.7V10c0-1.1.3-1.9 1.7-1.9Z"
        fill="currentColor"
      />
    </svg>
  )
}
