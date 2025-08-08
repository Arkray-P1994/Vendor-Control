import { showErrorToast } from "@/components/toast/error-toast";
import { showSuccessToast } from "@/components/toast/success-toast";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
// --- Utility fetcher ---
export const fetcher = async (url: string, payload?: any) => {
  const isFormData = payload instanceof FormData;

  const options: RequestInit = {
    method: payload ? "POST" : "GET",
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      // Only set content-type if NOT form data
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const addTask = (url: string, { arg }: { arg: any }) => {
  // arg is FormData here, send it as-is without JSON.stringify
  return fetcher(url, arg);
};

export function useAddTask() {
  const router = useRouter();
  return useSWRMutation(
    "http://192.168.208.5/api-app/api/task/store",
    addTask,
    {
      onSuccess: (data) => {
        toast("Task added successfully!", {
          description: JSON.stringify(data, null, 2),
        });
      },
      onError: () => {
        showErrorToast("Failed to add task");
      },
    }
  );
}
