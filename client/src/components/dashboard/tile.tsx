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
      <CardContent className="flex items-center justify-center h-full">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </CardContent>
    </Card>
  );
}
