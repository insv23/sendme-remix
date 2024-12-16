import { SendHorizontal } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  hasOngoingUploads: boolean;
}

export function SubmitButton({
  isSubmitting,
  hasOngoingUploads,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || hasOngoingUploads}
      className="flex items-center gap-1 rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "发送中..." : "发送"}
      <SendHorizontal className="w-4 h-4" />
    </button>
  );
}
