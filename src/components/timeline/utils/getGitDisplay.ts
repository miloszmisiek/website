import { isWorkEntry } from "./isWorkEntry";
import { GitBranchPrefixEnum } from "../../../data/types";
import type { TimelineEntry } from "../../../data/schema";

const NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]/g;
const GROUP_NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]+/gi;
const BEGIN_DASH_OR_END_DASH_REGEX = /^-|-$/g;

export function getGitDisplay(entry: TimelineEntry) {
  const { type, id, company } = entry;
  const isWork = isWorkEntry(type);

  const shortHash = id
    .replace(NOT_ALPHANUMERIC_REGEX, "")
    .slice(0, 7)
    .padEnd(7, "0");

  const branchSlug = company
    .toLowerCase()
    .replace(GROUP_NOT_ALPHANUMERIC_REGEX, "-")
    .replace(BEGIN_DASH_OR_END_DASH_REGEX, "");

  const branchPrefix = isWork
    ? GitBranchPrefixEnum.Feature
    : GitBranchPrefixEnum.Education;

  const branchName = `${branchPrefix}/${branchSlug}`;

  return { shortHash, branchName };
}
