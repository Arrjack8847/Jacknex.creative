import { Button } from '../components/common/Button'
import { PageLayout } from '../components/layout/PageLayout'

export function ThankYouPage() {
  return (
    <PageLayout
      description="Project enquiry confirmation for JackNex Creative."
      title="Thank You"
    >
      <section className="section-shell grid min-h-[60vh] place-items-center py-16 text-center">
        <div className="max-w-3xl">
          <p className="mono-label text-xs font-bold text-[var(--accent)]">Enquiry received</p>
          <h1 className="display-type mt-5 text-6xl text-[var(--text)] sm:text-8xl">Thank you.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Your project enquiry has been simulated successfully. Jack can follow up through your
            selected contact method once a real form endpoint is connected.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">Return Home</Button>
            <Button to="/work" variant="secondary">
              View More Work
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
