import TodoList from "@/features/todolist";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vendor/")({
  component: TodoListPage,
});
export default function TodoListPage() {
  return <TodoList />;
}
