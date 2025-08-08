import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTasks() {
  const { data, error, isLoading } = useSWR(
    "http://192.168.208.5/api-app/api/task",
    fetcher
  );

  return {
    tasks: data?.data ?? [],
    error,
    isLoading,
  };
}
