import { useTasks } from "@/api/task";
import { TodoCreatePage } from "@/components/input-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vendor/update/$id")({
  loader: async ({ params }) => {
    const taskId = +params.id;
    if (!taskId) {
      throw new Error("Task not found");
    }
    return taskId;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const taskId = Route.useLoaderData();
  const { tasks, isLoading } = useTasks();

  if (isLoading) return <p>Loading</p>;
  const task = tasks.find((task: { id: number }) => task.id === taskId);
  return <TodoCreatePage taskData={task} action={"update"} />;
}
