import { Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { UploadStatus } from "~/types/upload";

export function StatusIcon({ status }: { status: UploadStatus }) {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 text-gray-400" />;
    case "uploading":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
  }
}
