import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Task } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function Tasks() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const createTask = useMutation({
    mutationFn: async (title: string) => {
      await apiRequest("POST", "/api/tasks", { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setTitle("");
    },
  });

  const toggleTask = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      await apiRequest("PATCH", `/api/tasks/${id}`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <Button
          onClick={() => createTask.mutate(title)}
          disabled={!title || createTask.isPending}
        >
          Add
        </Button>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {tasks?.map((task) => (
          <div key={task.id} className="flex items-center gap-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) =>
                toggleTask.mutate({ id: task.id, completed: checked as boolean })
              }
            />
            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
