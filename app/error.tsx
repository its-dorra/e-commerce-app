"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="container mx-auto min-h-screen space-y-8 px-8 py-12 md:px-16 lg:px-24">
      <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
      <p className="text-lg">{error.message}</p>
    </div>
  );
}
