"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState, useEffect } from "react";
import { SortDirection, Sort, Type, Repository } from "./types";
import { RepoTable } from "./RepoTable";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { set } from "date-fns";

const GITHUB_API = "https://api.github.com";

type Inputs = {
  name: string;
};

enum InputType {
  USER = "user",
  ORGANIZATION = "organization",
}

const getGithubURL = (
  inputType: InputType,
  name: string,
  page: number = 1,
  sort: Sort = Sort.FULL_NAME,
  sortDirection: SortDirection = SortDirection.ASC,
  type: Type = Type.ALL
): string =>
  `${GITHUB_API}/${
    inputType === InputType.ORGANIZATION ? "orgs" : "users"
  }/${name}/repos?per_page=10&page=${page}&sort=${sort}&direction=${sortDirection}&type=${type}`;

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [inputType, setInputType] = useState<InputType>(InputType.ORGANIZATION);
  const [formError, setFormError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sortField, setSortField] = useState<Sort>(Sort.FULL_NAME);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );
  const [page, setPage] = useState(1);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  useEffect(() => {
    if (repos.length) {
      handleSubmit(onSubmit)();
    }
  }, [sortField, sortDirection, page]);

  const onInputTypeChange = () => {
    setInputType((prev: InputType) =>
      prev === InputType.USER ? InputType.ORGANIZATION : InputType.USER
    );
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log("onSubmit", {
        data,
        url: getGithubURL(inputType, data.name, page, sortField, sortDirection),
      });
      setIsFetching(true);
      setFormError(null);
      try {
        fetch(
          getGithubURL(inputType, data.name, page, sortField, sortDirection)
        )
          .then((data) => data.json())
          .then((repos) => setRepos(repos))
          .then(() => setIsFetching(false));
      } catch (error) {
        setFormError(`Error fetching repos: ${error}`);
        console.error(error);
      }
    },
    [sortField, sortDirection, inputType, page]
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
              inputType === InputType.ORGANIZATION
                ? "bg-blue-500 hover:bg-blue-700 border-blue-700"
                : "bg-gray-500 hover:bg-gray-700 border-gray-700"
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            onClick={onInputTypeChange}
          >
            Organization
          </button>
          <button
            type="button"
            className={`w-36 mr-12 mb-12 ${
              inputType === InputType.USER
                ? "bg-blue-500 hover:bg-blue-700 border-blue-700"
                : "bg-gray-500 hover:bg-gray-700 border-gray-700"
            } text-white font-bold py-2 px-4 border  rounded`}
            onClick={onInputTypeChange}
          >
            USER
          </button>
        </div>
        <label
          htmlFor="organization"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {inputType === InputType.ORGANIZATION ? "Organization" : "User"}
        </label>
        <input
          type="text"
          id="name"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-80 md:w-1/2 p-2.5"
          placeholder={`Enter a github ${
            inputType === InputType.ORGANIZATION ? "organization" : "user"
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
        />
      ) : null}
    </main>
  );
}
