import type { Metadata } from "next";
import { UpcomingDropsView } from "@/components/UpcomingDropsView";

export const metadata: Metadata = {
  title: "Upcoming Drops & Launch Calendar | TrendWear",
  description:
    "Explore upcoming streetwear and high-heat sneaker releases with live countdown timers and release reminders.",
};

export default function DropsPage() {
  return <UpcomingDropsView />;
}
