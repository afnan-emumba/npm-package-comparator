import axios from "axios";

export const fetchPackages = async (query: string) => {
  const response = await axios.get(
    `https://api.npms.io/v2/search/suggestions?q=${query}`
  );
  return response.data.map((pkg: any) => ({
    value: pkg.package.name,
    label: pkg.package.name,
  }));
};

export const fetchPackageDetails = async (packageName: string) => {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const data = await response.json();
  const latestVersion = data["dist-tags"].latest;
  const latestVersionData = data.versions[latestVersion];

  return {
    name: data.name,
    description: data.description,
    lastModified: data.time.modified,
    version: latestVersion,
    keywords: latestVersionData.keywords || [],
    repository: latestVersionData.repository?.url || null,
    license: latestVersionData.license || null,
    author: latestVersionData.author?.name || null,
    maintainerEmail: data.maintainers?.[0]?.email || null,
  };
};
