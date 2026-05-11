import { getPortfolioData } from "@/lib/data";
import PortfolioPage from "@/components/PortfolioPage";

export default function Home() {
  const data = getPortfolioData();
  return <PortfolioPage data={data} />;
}
