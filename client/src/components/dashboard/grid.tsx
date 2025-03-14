import { useQuery } from "@tanstack/react-query";
import { type Tile as TileType } from "@shared/schema";
import { Tile } from "./tile";
import { Link } from "wouter";
import { StickyNote, CheckSquare, Timer } from "lucide-react";

const TileIcons: Record<string, React.ComponentType> = {
  notes: StickyNote,
  tasks: CheckSquare,
  paceCalculator: Timer,
};

// Add a helper function to format the tile type display name
const formatTileType = (type: string) => {
  switch (type) {
    case 'paceCalculator':
      return 'Pace Calculator';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

export function Grid() {
  const { data: tiles, isLoading } = useQuery<TileType[]>({
    queryKey: ["/api/tiles"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!tiles) return null;

  const sortedTiles = [...tiles].sort((a, b) => a.position - b.position);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTiles.map((tile) => {
        const Icon = TileIcons[tile.type];
        return (
          <Link key={tile.id} href={`/${tile.type}`}>
            <a className="h-64 block transition-transform hover:scale-[1.02]">
              <Tile tile={tile}>
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Icon className="w-12 h-12 text-primary" />
                  <p className="text-xl font-medium">{formatTileType(tile.type)}</p>
                </div>
              </Tile>
            </a>
          </Link>
        );
      })}
    </div>
  );
}