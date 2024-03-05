import { Sort, SortDirection, Type, RequestType } from "../types";

const GITHUB_API = "https://api.github.com";

export const getGithubURL = (
  requestType: RequestType,
  name: string,
  page: number = 1,
  sort: Sort = Sort.FULL_NAME,
  sortDirection: SortDirection = SortDirection.ASC,
  type: Type = Type.ALL
): string =>
  `${GITHUB_API}/${
    requestType === RequestType.ORGANIZATION ? "orgs" : "users"
  }/${name}/repos?per_page=10&page=${page}&sort=${sort}&direction=${sortDirection}&type=${type}`;

export const getPageCount = (linkHeader: string | null): number | null => {
  // github link header: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
  // get last link url
  const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i;
  const url = linkHeader && linkHeader.match(lastPattern)?.[0];
  //match the page count
  const pagePattern = /(&page=)(\d+)/i;
  const match = url && url.match(pagePattern);

  if (match) {
    const [, , pageCount] = match;
    return parseInt(pageCount);
  }
  return null;
};
