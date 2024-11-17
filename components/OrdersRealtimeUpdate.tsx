"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Custom hook to handle Supabase real-time subscription
function useOrdersRealtimeUpdate() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("orders_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Orders",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    // Cleanup function to remove the subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
}

// Component that uses the custom hook
export default function OrdersRealtimeUpdate() {
  useOrdersRealtimeUpdate();

  return null; // This component doesn't render anything
}
