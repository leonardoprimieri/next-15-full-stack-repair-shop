import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset?: () => void;
};

export function ErrorUI({ error, reset }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-md">
          An unexpected error occurred while processing your request.
        </p>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md max-w-2xl w-full overflow-auto">
            <p className="font-mono text-sm text-red-600">{error.message}</p>
          </div>
        )}
        <div className="flex gap-4 mt-6">
          {reset && (
            <Button onClick={reset} variant="default">
              Try Again
            </Button>
          )}
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
