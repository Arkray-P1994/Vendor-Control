import { showErrorToast } from "@/components/toast/error-toast";
import { showSuccessToast } from "@/components/toast/success-toast";
import { useRouter } from "@tanstack/react-router";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
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

export const addTask = (url: string, { arg }: { arg: any }) =>
  fetcher(url, JSON.stringify(arg));

export function useAddTask() {
  const router = useRouter();
  return useSWRMutation("http://localhost/test/upload.php", addTask, {
    onSuccess: () => {
      showSuccessToast("Task added successfully");
      mutate("http://localhost/test/upload.php");
      // router.navigate({ to: "/todolist" });
    },
    onError: () => {
      showErrorToast("Failed to add task");
    },
  });
}
