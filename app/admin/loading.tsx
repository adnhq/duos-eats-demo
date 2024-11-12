import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="mt-32 flex items-center justify-center">
      <Loader2 className="w-16 h-16 animate-spin text-yellow-400" />
    </div>
  );
}

export default Loading;
