// src/lib/toasts.ts
import { toast } from "sonner";

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    position: "top-right",
    style: {
      "--normal-bg":
        "light-dark(var(--color-green-600), var(--color-green-400))",
      "--normal-text": "var(--color-white)",
      "--normal-border":
        "light-dark(var(--color-green-600), var(--color-green-400))",
    } as React.CSSProperties,
  });
