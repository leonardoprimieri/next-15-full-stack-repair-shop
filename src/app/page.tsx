import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
          Leonardo&apos;s Computer <br />
          Repair Shop
        </h1>

        <address className="mt-8 not-italic text-lg leading-relaxed">
          555 Gateway Lane <br />
          Kansas City, KS 555555
        </address>

        <p className="mt-6 font-medium text-lg">
          Open Daily: 9am to 5pm
        </p>

        <Link
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          href="tel:5555555555"
        >
          555-555-5555
        </Link>
      </div>
    </div>
  );
}
