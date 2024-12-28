import LoadingSpinner from "@/lib/components/LoadingSpinner";

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner size="xl" />
    </div>
  );
}
