import { showErrorToast } from "@/components/toast/error-toast";
import { showSuccessToast } from "@/components/toast/success-toast";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "@tanstack/react-router";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
const updateTask = (url: string, { arg }: { arg: any }) =>
  fetcher(url, JSON.stringify(arg));

export function useUpdateTask({ taskID }: { taskID: string | number }) {
  const router = useRouter();

  return useSWRMutation(
    `http://192.168.208.5/api-app/api/task/update/${taskID}`,
    updateTask,
    {
      onSuccess: (data) => {
        showSuccessToast("Task updated successfully!");
        mutate(`http://192.168.208.5/api-app/api/task/${data.id}`);
        router.navigate({ to: "/todolist" });
      },
      onError: () => {
        showErrorToast("Failed to update task");
      },
    }
  );
}
