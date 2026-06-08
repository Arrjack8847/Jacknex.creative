import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { SocialLinks } from '../components/common/SocialLinks'
import { PageLayout } from '../components/layout/PageLayout'
import { contactSocialLinks } from '../data/socialLinks'
import { siteConfig } from '../data/siteConfig'
import {
  budgetOptions,
  contactMethods,
  emptyContactForm,
  serviceOptions,
  submitContactEnquiry,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from '../lib/contact'

function ErrorMessage({ error, id }: { error?: string; id: string }) {
  if (!error) {
    return null
  }

  return (
    <p className="mt-2 text-sm text-[var(--danger)]" id={id}>
      {error}
    </p>
  )
}

export function ContactPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<ContactFormData>(emptyContactForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const setField = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (errors[field]) {
      const nextErrors = validateContactForm({ ...formData, [field]: value })
      setErrors(nextErrors)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting || isSubmitted) {
      return
    }

    const nextErrors = validateContactForm(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    const result = await submitContactEnquiry(formData)
    setIsSubmitting(false)

    if (result.ok) {
      setIsSubmitted(true)
      navigate('/thank-you')
      return
    }

    setErrors(result.errors)
  }

  return (
    <PageLayout
      description="Submit a project enquiry for video editing, music teasers, event recaps, vertical edits, or supporting visual assets."
      title="Contact"
    >
      <section className="section-shell grid gap-12 pb-16 pt-10 sm:pb-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mono-label text-xs font-bold text-[var(--accent)]">Start a Project</p>
          <h1 className="display-type mt-5 text-6xl text-[var(--text)] sm:text-8xl">
            Tell Jack what you want to create.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Share the essentials so the project scope, creative direction, format, and preferred
            contact method are clear from the first message.
          </p>
          <div className="mt-10 space-y-4 border-t border-[var(--line)] pt-6 text-[var(--muted)]">
            <p>
              Email: <a className="text-[var(--text)] hover:text-[var(--accent)]" href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a>
            </p>
            <SocialLinks links={contactSocialLinks} />
          </div>
        </div>

        <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="fullName">
                Full name
              </label>
              <input
                aria-describedby="fullName-error"
                aria-invalid={Boolean(errors.fullName)}
                className="input-shell mt-2"
                id="fullName"
                name="fullName"
                onChange={(event) => setField('fullName', event.target.value)}
                required
                value={formData.fullName}
              />
              <ErrorMessage error={errors.fullName} id="fullName-error" />
            </div>
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="email">
                Email
              </label>
              <input
                aria-describedby="email-error"
                aria-invalid={Boolean(errors.email)}
                className="input-shell mt-2"
                id="email"
                name="email"
                onChange={(event) => setField('email', event.target.value)}
                required
                type="email"
                value={formData.email}
              />
              <ErrorMessage error={errors.email} id="email-error" />
            </div>
          </div>

          <div>
            <label className="mono-label text-xs text-[var(--muted)]" htmlFor="projectType">
              Company or personal project
            </label>
            <input
              aria-describedby="projectType-error"
              aria-invalid={Boolean(errors.projectType)}
              className="input-shell mt-2"
              id="projectType"
              name="projectType"
              onChange={(event) => setField('projectType', event.target.value)}
              placeholder="Company campaign, personal film, creator content..."
              required
              value={formData.projectType}
            />
            <ErrorMessage error={errors.projectType} id="projectType-error" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="serviceRequired">
                Service required
              </label>
              <select
                aria-describedby="serviceRequired-error"
                aria-invalid={Boolean(errors.serviceRequired)}
                className="input-shell mt-2"
                id="serviceRequired"
                name="serviceRequired"
                onChange={(event) => setField('serviceRequired', event.target.value)}
                required
                value={formData.serviceRequired}
              >
                <option value="">Select a service</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ErrorMessage error={errors.serviceRequired} id="serviceRequired-error" />
            </div>
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="budgetRange">
                Budget range
              </label>
              <select
                aria-describedby="budgetRange-error"
                aria-invalid={Boolean(errors.budgetRange)}
                className="input-shell mt-2"
                id="budgetRange"
                name="budgetRange"
                onChange={(event) => setField('budgetRange', event.target.value)}
                required
                value={formData.budgetRange}
              >
                <option value="">Select a range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ErrorMessage error={errors.budgetRange} id="budgetRange-error" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="deadline">
                Desired deadline
              </label>
              <input
                className="input-shell mt-2"
                id="deadline"
                name="deadline"
                onChange={(event) => setField('deadline', event.target.value)}
                type="date"
                value={formData.deadline}
              />
            </div>
            <div>
              <label className="mono-label text-xs text-[var(--muted)]" htmlFor="preferredContact">
                Preferred contact method
              </label>
              <select
                aria-describedby="preferredContact-error"
                aria-invalid={Boolean(errors.preferredContact)}
                className="input-shell mt-2"
                id="preferredContact"
                name="preferredContact"
                onChange={(event) => setField('preferredContact', event.target.value)}
                required
                value={formData.preferredContact}
              >
                <option value="">Select a method</option>
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              <ErrorMessage error={errors.preferredContact} id="preferredContact-error" />
            </div>
          </div>

          <div>
            <label className="mono-label text-xs text-[var(--muted)]" htmlFor="description">
              Project description
            </label>
            <textarea
              aria-describedby="description-error"
              aria-invalid={Boolean(errors.description)}
              className="input-shell mt-2 min-h-36 resize-y"
              id="description"
              name="description"
              onChange={(event) => setField('description', event.target.value)}
              required
              value={formData.description}
            />
            <ErrorMessage error={errors.description} id="description-error" />
          </div>

          <div>
            <label className="mono-label text-xs text-[var(--muted)]" htmlFor="referenceLink">
              Reference link
            </label>
            <input
              aria-describedby="referenceLink-error"
              aria-invalid={Boolean(errors.referenceLink)}
              className="input-shell mt-2"
              id="referenceLink"
              name="referenceLink"
              onChange={(event) => setField('referenceLink', event.target.value)}
              placeholder="https://..."
              type="url"
              value={formData.referenceLink}
            />
            <ErrorMessage error={errors.referenceLink} id="referenceLink-error" />
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm leading-7 text-[var(--muted)]" htmlFor="consent">
              <input
                aria-describedby="consent-error"
                aria-invalid={Boolean(errors.consent)}
                checked={formData.consent}
                className="mt-1 h-5 w-5 accent-[var(--accent)]"
                id="consent"
                name="consent"
                onChange={(event) => setField('consent', event.target.checked)}
                required
                type="checkbox"
              />
              <span>I consent to being contacted about this project enquiry.</span>
            </label>
            <ErrorMessage error={errors.consent} id="consent-error" />
          </div>

          <Button disabled={isSubmitting || isSubmitted} type="submit">
            {isSubmitting ? 'Submitting' : isSubmitted ? 'Submitted' : 'Submit Enquiry'}
          </Button>
        </form>
      </section>
    </PageLayout>
  )
}
