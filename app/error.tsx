"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <CardTitle className="mt-3 text-center text-2xl font-extrabold text-gray-900">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="mt-2 text-center text-sm text-gray-600">
            We apologize for the inconvenience. Our team has been notified and
            is working on a fix.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
            <p>Error: {error.message}</p>
            {error.digest && <p className="mt-2">Digest: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
