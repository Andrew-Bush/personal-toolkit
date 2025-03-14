import { Grid } from "@/components/dashboard/grid";
import { Header } from "@/components/header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <Grid />
      </div>
    </div>
  );
}