import axios from "axios";

export const fetchPackages = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.npms.io/v2/search/suggestions?q=${query}`
    );
    // eslint-disable-next-line
    return response.data.map((pkg: any) => ({
      value: pkg.package.name,
      label: pkg.package.name,
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw new Error("Failed to fetch packages");
  }
};

export const fetchPackageDetails = async (packageName: string) => {
  try {
    const response = await axios.get(
      `https://api.npms.io/v2/package/${packageName}`
    );
    const data = response.data;
    console.log(data);
    return {
      name: data.collected.metadata.name,
      description: data.collected.metadata.description,
      lastModified: data.collected.metadata.date,
      version: data.collected.metadata.version,
      keywords: data.collected.metadata.keywords || [],
      repository: data.collected.metadata.links.repository || null,
      license: data.collected.metadata.license || null,
      author: data.collected.metadata.publisher?.username || null,
      maintainerEmail: data.collected.metadata.maintainers?.[0]?.email || null,
      homePage: data.collected.metadata.links.homepage || null,
      bugs: data.collected.metadata.links.bugs || null,
      downloadsCount: data.evaluation.popularity.downloadsCount,
      communityInterest: data.evaluation.popularity.communityInterest,
      carefulness: data.evaluation.quality.carefulness,
      downloads: data.collected.npm.downloads || [],
      health: data.evaluation.quality.health,
      starsCount: data.collected.github.starsCount,
    };
  } catch (error) {
    console.error("Error fetching package details:", error);
    throw new Error("Failed to fetch package details");
  }
};
