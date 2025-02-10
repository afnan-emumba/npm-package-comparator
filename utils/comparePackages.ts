import { PackageDetails } from "@/types/interfaces";

export const comparePackages = (
  package1: PackageDetails,
  package2: PackageDetails
) => {
  const score1 =
    0.2 * package1.communityInterest +
    0.5 * package1.downloadsCount +
    0.3 * package1.carefulness;

  const score2 =
    0.2 * package2.communityInterest +
    0.5 * package2.downloadsCount +
    0.3 * package2.carefulness;

  const winner = score1 > score2 ? package1 : package2;
  const ratio =
    score1 > score2
      ? (score1 / score2).toFixed(2)
      : (score2 / score1).toFixed(2);

  return { winner, ratio };
};
