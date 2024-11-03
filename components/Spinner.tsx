import { Loader2 } from "lucide-react";
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center mt-16">
      <Loader2 className="w-16 h-16 animate-spin text-yellow-400" />
    </div>
  );
}
