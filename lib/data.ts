import fs from "fs";
import path from "path";
import { PortfolioData } from "./types";

// Handle case where Next.js resolves cwd to parent due to lockfile
function getProjectRoot() {
  const cwd = process.cwd();
  const v2Sub = path.join(cwd, "v2");
  if (fs.existsSync(path.join(v2Sub, "data", "portfolio.json"))) return v2Sub;
  return cwd;
}

const dataPath = path.join(getProjectRoot(), "data", "portfolio.json");

export function getPortfolioData(): PortfolioData {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

export function savePortfolioData(data: PortfolioData) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
