"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <p className="eyebrow">An Error Occurred</p>
      <h1 className="font-display text-3xl font-normal text-stone-900 sm:text-4xl">
        Something Went Wrong
      </h1>
      <p className="font-body max-w-md text-xs font-light text-stone-500">
        {error.message}
      </p>
    </div>
  );
}
