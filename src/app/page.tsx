"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from "react";
import { SortDirection, Sort, Type, Repository } from "./types";
import { RepoTable } from "./RepoTable";

const GITHUB_API = "https://api.github.com";

type Inputs = {
  name: string;
};

enum INPUT_TYPE {
  USER = "user",
  ORGANIZATION = "organization",
}

const getGithubURL = (
  inputType: INPUT_TYPE,
  name: string,
  page: number = 1,
  sortDirection: SortDirection = SortDirection.ASC,
  type: Type = Type.ALL,
  sort: Sort = Sort.FULL_NAME
): string =>
  `${GITHUB_API}/${
    inputType === INPUT_TYPE.ORGANIZATION ? "orgs" : "users"
  }/${name}/repos?per_page=10&page=${page}&sort=${sort}&direction=${sortDirection}&type=${type}`;

export default function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [inputType, setInputType] = useState<INPUT_TYPE>(
    INPUT_TYPE.ORGANIZATION
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [sortField, setSortField] = useState<Sort>(Sort.FULL_NAME);

  const { register, handleSubmit } = useForm<Inputs>();

  const onInputTypeChange = () => {
    setInputType((prev: INPUT_TYPE) =>
      prev === INPUT_TYPE.USER ? INPUT_TYPE.ORGANIZATION : INPUT_TYPE.USER
    );
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsFetching(true);
    setFormError(null);
    try {
      fetch(getGithubURL(inputType, data.name, 1))
        .then((data) => data.json())
        .then((repos) => setRepos(repos));
    } catch (error) {
      setFormError(`Error fetching repos: ${error}`);
      console.error(error);
    }
    setIsFetching(false);
  };

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
              inputType === INPUT_TYPE.ORGANIZATION
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
              inputType === INPUT_TYPE.USER
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
          {inputType === INPUT_TYPE.ORGANIZATION ? "Organization" : "User"}
        </label>
        <input
          type="text"
          id="name"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5"
          placeholder={`Enter a github ${
            inputType === INPUT_TYPE.ORGANIZATION ? "organization" : "user"
          }`}
          {...register("name")}
        />
        <button className="mt-5 bg-blue-500 w-48 hover:bg-blue-700 border border-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        {formError && <span className="text-red-500">{formError}</span>}
      </form>
      {repos.length && <RepoTable repos={repos} />}
    </main>
  );
}
