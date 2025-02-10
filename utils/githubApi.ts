import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchRepoLanguages = async (repoUrl: string) => {
  try {
    const repoName = repoUrl.replace("https://github.com/", "");
    const languagesResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${repoName}/languages`
    );

    const languages = languagesResponse.data;

    return { languages };
  } catch (error) {
    console.error("Error fetching repository languages:", error);
    throw new Error("Failed to fetch repository languages");
  }
};
