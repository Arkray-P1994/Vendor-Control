import type React from "react";
import { toast } from "sonner";

export const showErrorToast = (message: string) =>
  toast.error(message, {
    position: "top-right",
    style: {
      "--normal-bg":
        "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
      "--normal-text": "var(--color-white)",
      "--normal-border": "transparent",
    } as React.CSSProperties,
  });
