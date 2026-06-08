export type MediaStatus = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error'

export const MEDIA_LOAD_TIMEOUT_MS = 30000
export const MEDIA_LOADER_DELAY_MS = 250

const supportedVideoExtensions = /\.(mp4|m4v|mov|webm)(\?.*)?(#.*)?$/i
const invalidPathPatterns = [
  /^#?$/,
  /^public[\\/]/i,
  /^\.?[\\/]?public[\\/]/i,
  /^[a-z]:[\\/]/i,
  /^\\\\/,
]

export function isValidMediaUrl(url?: string) {
  const value = url?.trim()

  if (!value) {
    return false
  }

  if (invalidPathPatterns.some((pattern) => pattern.test(value))) {
    return false
  }

  if (/placeholder|pending|todo/i.test(value)) {
    return false
  }

  if (value.startsWith('/')) {
    return supportedVideoExtensions.test(value)
  }

  try {
    const parsedUrl = new URL(value)
    return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:'
  } catch {
    return supportedVideoExtensions.test(value)
  }
}

export function warnMediaFailure(
  message: string,
  details: {
    errorName?: string
    mediaErrorCode?: number
    projectId?: string | number
    videoUrl?: string
  },
) {
  if (import.meta.env.DEV) {
    console.warn(message, details)
  }
}
