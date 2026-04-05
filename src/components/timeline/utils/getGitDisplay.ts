import type { TimelineEntry } from "../../../data/schema";
import { isWorkEntry } from "./isWorkEntry";
import { GitBranchPrefixEnum } from "../../../data/types";

const NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]/g; // Matches any non-alphanumeric character
const GROUP_NOT_ALPHANUMERIC_REGEX = /[^a-z0-9]+/gi; // Matches one or more non-alphanumeric characters
const BEGIN_DASH_OR_END_DASH_REGEX = /^-|-$/g; // Matches a dash at the beginning or end of the string

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
