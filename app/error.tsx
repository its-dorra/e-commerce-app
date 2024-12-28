"use client";

import {
  ADMIN_AUTHENTICATION_ERROR_MESSAGE,
  AUTHENTICATION_ERROR_MESSAGE,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isAuthenticationError = error.message.includes(
    AUTHENTICATION_ERROR_MESSAGE,
  );

  const isAdminAuthenticationError = error.message.includes(
    ADMIN_AUTHENTICATION_ERROR_MESSAGE,
  );

  return (
    <div className="container mx-auto min-h-screen space-y-8 py-12">
      {isAuthenticationError && (
        <>
          <h1 className="text-4xl font-bold">Oops! You Need to Be Logged In</h1>
          <p className="text-lg">To access this page, please log in first.</p>

          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </>
      )}

      {isAdminAuthenticationError && (
        <>
          <h1 className="text-4xl font-bold">Oops! You Need to Be an Admin</h1>
          <p className="text-lg">To access this page, please log in first.</p>

          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </>
      )}

      {!isAuthenticationError && !isAdminAuthenticationError && (
        <>
          <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
          <p className="text-lg">{error.message}</p>
        </>
      )}
    </div>
  );
}
