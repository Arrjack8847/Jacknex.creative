import { Button } from '../components/common/Button'
import { PageLayout } from '../components/layout/PageLayout'

export function NotFoundPage() {
  return (
    <PageLayout
      description="The requested JackNex Creative page could not be found."
      title="Page Not Found"
    >
      <section className="section-shell grid min-h-[60vh] place-items-center py-16 text-center">
        <div className="max-w-3xl">
          <p className="mono-label text-xs font-bold text-[var(--accent)]">404</p>
          <h1 className="display-type mt-5 text-6xl text-[var(--text)] sm:text-8xl">Frame missing.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            This page is not in the current cut. Head back home or browse the work archive.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">Return Home</Button>
            <Button to="/work" variant="secondary">
              View Work
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
