import Spinner from "@/components/Spinner";
import ThankYou from "@/components/ThankYou";
import React, { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { orderId } = await searchParams;

  if (!orderId) return null;

  return (
    <Suspense fallback={<Spinner />} key={orderId}>
      <ThankYou orderId={orderId as string} />;
    </Suspense>
  );
}
