import { useQuery } from "@tanstack/react-query";
import { type Tile as TileType } from "@shared/schema";
import { Tile } from "./tile";
import { Link } from "wouter";

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
      {sortedTiles.map((tile) => (
        <Link key={tile.id} href={`/${tile.type}`}>
          <a className="h-64 block transition-transform hover:scale-[1.02]">
            <Tile tile={tile}>
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-muted-foreground">Click to view {tile.type}</p>
              </div>
            </Tile>
          </a>
        </Link>
      ))}
    </div>
  );
}