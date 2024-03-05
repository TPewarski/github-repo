"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState, useEffect } from "react";
import { SortDirection, Sort, Repository, RequestType } from "./types";
import { RepoTable } from "./RepoTable";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getGithubURL, getPageCount } from "./utilities/apiUtilities";

type Inputs = {
  name: string;
};

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>(
    RequestType.ORGANIZATION
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sortField, setSortField] = useState<Sort>(Sort.FULL_NAME);
  const [linkHeader, setLinkHeader] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  //refetch repositories with new sort order or page
  useEffect(() => {
    if (repos.length) {
      handleSubmit(onSubmit)();
    }
  }, [sortField, sortDirection, page]);

  //extract page count from link header
  useEffect(() => {
    if (linkHeader) {
      const pageCount = getPageCount(linkHeader);
      if (pageCount) {
        setPageCount(pageCount);
      }
    }
  }, [linkHeader]);

  const onRequestTypeChange = () => {
    setRequestType((prev: RequestType) =>
      prev === RequestType.USER ? RequestType.ORGANIZATION : RequestType.USER
    );
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      setIsFetching(true);
      setFormError(null);
      try {
        // NextJS automatically cache's fetch requests
        const resp = await fetch(
          getGithubURL(requestType, data.name, page, sortField, sortDirection)
        );

        if (!resp.ok) {
          throw new Error(`Error fetching repos: ${resp.statusText}`);
        }

        // page count comes from link header
        const linkHeader = resp.headers.get("link");
        setLinkHeader(linkHeader);

        const repositories = await resp.json();
        setRepos(repositories);
      } catch (error) {
        setFormError(`Request Error: ${error}`);
        console.error(error);
      }
      setIsFetching(false);
    },
    [sortField, sortDirection, requestType, page]
  );

  const onSortChange = (col: Sort) => {
    setSortDirection((prev) =>
      prev === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
    );
    setSortField(col);
  };

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  return (
    <main className="flex w-full min-h-screen flex-col justify-between p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-1/2 flex-col mb-20 font-mono text-sm lg:flex"
      >
        <label
          htmlFor="organization"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search By:
        </label>
        <div className="flex flex-row">
          <button
            type="button"
            className={`w-36 mr-12 mb-12 ${
              requestType === RequestType.ORGANIZATION
                ? "bg-blue-500 hover:bg-blue-700 border-blue-700"
                : "bg-gray-500 hover:bg-gray-700 border-gray-700"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            onClick={onRequestTypeChange}
          >
            Organization
          </button>
          <button
            type="button"
            className={`w-36 mr-12 mb-12 ${
              requestType === RequestType.USER
                ? "bg-blue-500 hover:bg-blue-700 border-blue-700"
                : "bg-gray-500 hover:bg-gray-700 border-gray-700"
            } text-white font-bold py-2 px-4 border  rounded`}
            onClick={onRequestTypeChange}
          >
            USER
          </button>
        </div>
        <label
          htmlFor="organization"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {requestType === RequestType.ORGANIZATION ? "Organization" : "User"}
        </label>
        <input
          type="text"
          id="name"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-80 md:w-1/2 p-2.5"
          placeholder={`Enter a github ${
            requestType === RequestType.ORGANIZATION ? "organization" : "user"
          }`}
          {...register("name")}
        />
        <div className="flex flex-row">
          <button className="mt-5 mr-5 bg-blue-500 w-48 hover:bg-blue-700 border border-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
          {isFetching && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
        {formError && <span className="text-red-500">{formError}</span>}
      </form>
      {repos.length ? (
        <RepoTable
          repos={repos}
          handleSortChange={onSortChange}
          handlePageChange={onChangePage}
          page={page}
          count={pageCount}
        />
      ) : null}
    </main>
  );
}
