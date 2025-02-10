export interface PackageDetails {
  key?: string;
  name: string;
  description: string;
  lastModified: string;
  version: string;
  keywords: string[];
  repository: string | null;
  license: string | null;
  author: string | null;
  maintainerEmail: string | null;
  homePage: string | null;
  bugs: string | null;
  downloadsCount: number;
  communityInterest: number;
  carefulness: number;
  downloads: { count: number; from: string; to: string }[];
  health: number;
  starsCount: number;
}
