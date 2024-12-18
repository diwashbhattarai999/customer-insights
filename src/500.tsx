import { Link } from 'react-router';

import { CircleX } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleX className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          500 Error
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops, something went wrong! We're experiencing an unexpected error.
        </p>
        <div className="mt-6">
          <Link
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            to="/"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
