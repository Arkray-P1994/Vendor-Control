import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  active: boolean;
}

export function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1">
      {active ? (
        <>
          <CheckIcon
            className="text-emerald-500"
            size={12}
            aria-hidden="true"
          />
          Active
        </>
      ) : (
        <>
          <XIcon className="text-red-500" size={12} aria-hidden="true" />
          Inactive
        </>
      )}
    </Badge>
  );
}
