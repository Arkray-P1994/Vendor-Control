"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddTask } from "@/features/vendor/actions.ts/add-task";
import { useUpdateTask } from "@/features/vendor/actions.ts/update-task";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const fetcher = async (url: string, payload?: string) => {
  const options = {
    method: payload ? "POST" : "GET",
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options).then((r) => {
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    return r.json();
  });
};

const FormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  task_description: z.string().min(2, {
    message: "Task description must be at least 2 characters.",
  }),
});

export function VendorCreatePage({
  taskData,
  action,
}: {
  taskData?: any;
  action: "create" | "update";
}) {
  const router = useRouter();
  const { trigger: addTaskMutation, isMutating: isAdding } = useAddTask();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: taskData?.id || 0,
      title: taskData?.title || "",
      task_description: taskData?.task_description || "",
    },
  });

  const { trigger: updateTaskMutation, isMutating: isUpdating } = useUpdateTask(
    {
      taskID: taskData?.id,
    }
  );
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (action === "create") {
      await addTaskMutation(data);
    } else {
      await updateTaskMutation(data);
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          {/* <Button
            variant="ghost"
            onClick={() => router.navigate({ to: "/todolist" })}
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button> */}

          <h1 className="text-3xl font-bold">
            {action === "create" ? "Add New Vendor " : "Update Vendor"}
          </h1>
          <p className=" mt-2">
            {action === "create"
              ? "Add a new task to your todo list"
              : "Update the task in your todo list"}
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {action === "create" ? (
                <>
                  <Plus className="w-5 h-5" />
                  New Todo
                </>
              ) : (
                <>
                  <Pencil className="w-5 h-5" />
                  Update Todo
                </>
              )}
            </CardTitle>

            <CardDescription>
              {action === "create"
                ? "Fill in the details below to create your new todo item."
                : "Fill in the details below to update your todo item."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your task a descriptive title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="task_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter task description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide details about what needs to be done.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={
                    form.formState.isSubmitting || isAdding || isUpdating
                  }
                >
                  {form.formState.isSubmitting || isAdding || isUpdating
                    ? action === "create"
                      ? "Adding..."
                      : "Updating..."
                    : action === "create"
                      ? "Add Task"
                      : "Update Task"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Tips Card */}
      </div>
    </div>
  );
}
