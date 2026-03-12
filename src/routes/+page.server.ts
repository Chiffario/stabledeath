// src/routes/+page.server.ts
import {
  getChangelogData,
  getLazerAbsolutePeak,
  getLazerRelativePeak,
} from "../lib/server/stats.server.ts";

export const load = async () => {
  return {
    changelogs: await getChangelogData(),
    peak: await getLazerAbsolutePeak(),
    peakRel: await getLazerRelativePeak(),
  };
};
