import { TodoCreatePage } from "@/components/input-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vendor/create")({
  component: TodoListPage,
});
export default function TodoListPage() {
  return <TodoCreatePage action={"create"} />;
}
