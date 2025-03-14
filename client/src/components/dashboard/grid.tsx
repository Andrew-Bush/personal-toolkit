import { useQuery } from "@tanstack/react-query";
import { type Tile as TileType } from "@shared/schema";
import { Tile } from "./tile";
import { Notes } from "@/pages/notes";
import { Weather } from "@/pages/weather";
import { Tasks } from "@/pages/tasks";

const TileComponents: Record<string, React.ComponentType> = {
  notes: Notes,
  weather: Weather,
  tasks: Tasks,
};

export function Grid() {
  const { data: tiles, isLoading } = useQuery<TileType[]>({
    queryKey: ["/api/tiles"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!tiles) return null;

  const sortedTiles = [...tiles].sort((a, b) => a.position - b.position);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sortedTiles.map((tile) => {
        const Component = TileComponents[tile.type];
        return (
          <div key={tile.id} className="h-64">
            <Tile tile={tile}>
              <Component />
            </Tile>
          </div>
        );
      })}
    </div>
  );
}
