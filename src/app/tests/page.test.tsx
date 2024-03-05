import { test, expect } from "@jest/globals";
import { getGithubURL, getPageCount } from "../page";

test("Generating user api url", () => {
  const url = getGithubURL("user", "test", 1, "name", "asc");
  expect(url).toBe(
    "https://api.github.com/users/test/repos?per_page=10&page=1&sort=name&direction=asc&type=all"
  );
});

test("Generating organization api url", () => {
  const url = getGithubURL("organization", "test", 1, "name", "asc");
  expect(url).toBe(
    "https://api.github.com/orgs/test/repos?per_page=10&page=1&sort=name&direction=asc&type=all"
  );
});

test("Extracting page count from link header", () => {
  const linkHeader =
    '<https://api.github.com/user/1/repos?per_page=10&page=2>; rel="next", <https://api.github.com/user/1/repos?per_page=10&page=2>; rel="last"';
  const pageCount = getPageCount(linkHeader);
  expect(pageCount).toBe(2);
});
