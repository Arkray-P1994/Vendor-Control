import { VendorCreatePage } from "@/components/vendor-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vendor/create")({
  component: TodoListPage,
});
export default function TodoListPage() {
  return <VendorCreatePage action={"create"} />;
}
