"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { ErrorUI } from "@/components/error-ui/error-ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <ErrorUI error={error} reset={reset} />;
}
