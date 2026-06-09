export const serviceOptions = [
  'Video Editing',
  'Music Video Teaser',
  'Event Recap Edit',
  'Vertical Short-form Edit',
  'Poster / Thumbnail Support',
  'Other',
] as const

export const budgetOptions = [
  'Editable starter range',
  'Editable mid-range project',
  'Editable full campaign range',
  'Not sure yet',
] as const

export const contactMethods = ['Email', 'Viber', 'Telegram', 'Facebook'] as const

export interface ContactFormData {
  fullName: string
  email: string
  projectType: string
  serviceRequired: string
  budgetRange: string
  deadline: string
  description: string
  referenceLink: string
  preferredContact: string
  consent: boolean
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export const emptyContactForm: ContactFormData = {
  fullName: '',
  email: '',
  projectType: '',
  serviceRequired: '',
  budgetRange: '',
  deadline: '',
  description: '',
  referenceLink: '',
  preferredContact: '',
  consent: false,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = 'Enter your full name.'
  }

  if (!emailPattern.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!data.projectType.trim()) {
    errors.projectType = 'Tell Jack whether this is a company or personal project.'
  }

  if (!data.serviceRequired) {
    errors.serviceRequired = 'Choose the service you need.'
  }

  if (!data.budgetRange) {
    errors.budgetRange = 'Choose a budget range placeholder.'
  }

  if (!data.description.trim()) {
    errors.description = 'Share a short project description.'
  }

  if (!data.preferredContact) {
    errors.preferredContact = 'Choose a preferred contact method.'
  }

  if (!data.consent) {
    errors.consent = 'Confirm that Jack can contact you about this enquiry.'
  }

  if (data.referenceLink.trim()) {
    try {
      new URL(data.referenceLink.trim())
    } catch {
      errors.referenceLink = 'Use a full URL, such as https://example.com.'
    }
  }

  return errors
}

export async function submitContactEnquiry(data: ContactFormData) {
  const errors = validateContactForm(data)
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors }
  }

  // TODO: Connect this abstraction to Formspree, EmailJS, Supabase, or a backend endpoint.
  await new Promise((resolve) => window.setTimeout(resolve, 800))

  return { ok: true as const }
}