import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type Note } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function Notes() {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { data: notes } = useQuery<Note[]>({
    queryKey: ["/api/notes"],
  });

  const createNote = useMutation({
    mutationFn: async (content: string) => {
      await apiRequest("POST", "/api/notes", { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setContent("");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="New note..."
          className="h-20"
        />
        <Button 
          onClick={() => createNote.mutate(content)}
          disabled={!content || createNote.isPending}
        >
          Add
        </Button>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {notes?.map((note) => (
          <div key={note.id} className="p-2 bg-muted rounded">
            {note.content}
          </div>
        ))}
      </div>
    </div>
  );
}
