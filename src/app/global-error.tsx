"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { ErrorUI } from "@/components/error-ui/error-ui";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorUI error={error} />
      </body>
    </html>
  );
}
