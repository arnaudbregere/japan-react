"use client";

import RootError from "@/components/RootError/RootError";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <RootError error={error} onRetry={reset} />;
}