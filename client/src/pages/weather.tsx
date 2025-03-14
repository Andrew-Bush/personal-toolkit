import { CloudSun } from "lucide-react";

export function Weather() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <CloudSun className="w-16 h-16 text-primary" />
      <div className="text-2xl font-semibold">23°C</div>
      <div className="text-muted-foreground">Partly Cloudy</div>
    </div>
  );
}
