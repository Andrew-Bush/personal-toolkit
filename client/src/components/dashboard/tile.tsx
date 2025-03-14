import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type Tile } from "@shared/schema";
import { ErrorBoundary } from "@/components/error-boundary";

interface TileProps {
  tile: Tile;
  children: React.ReactNode;
}

export function Tile({ tile, children }: TileProps) {
  return (
    <Card className="h-full">
      <CardHeader className="cursor-move">
        <CardTitle className="text-lg capitalize">{tile.type}</CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </CardContent>
    </Card>
  );
}
