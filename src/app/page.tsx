"use client";

import Image from "next/image";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { use, useState } from "react";
import ReactPaginate from "react-paginate";
import { SortDirection, Sort, Type, Repository } from "./types";
import { RepoTable } from "./RepoTable";

const GITHUB_API = "https://api.github.com";

type Inputs = {
  user: string;
  organization: string;
};

const getGithubURL = (
  user?: string,
  organization?: string,
  page: number = 1,
  sortDirection: SortDirection = SortDirection.ASC,
  type: Type = Type.ALL,
  sort: Sort = Sort.FULL_NAME
): string =>
  `${GITHUB_API}/orgs/${organization}/repos?per_page=10&page=${page}&sort=${sort}&direction=${sortDirection}&type=${type}`;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isFetching, setIsFetching] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsFetching(true);
    setFormError(null);
    try {
      fetch(getGithubURL(data.user, data.organization, 1))
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
          Organization
        </label>
        <input
          type="text"
          id="organization"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a github organization"
          {...register("organization")}
        />
        <label
          htmlFor="user"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User
        </label>
        <input
          type="text"
          id="user"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a github username"
          {...register("user")}
        />
        <button className="mt-5 bg-blue-500 w-48 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
        {formError && <span className="text-red-500">{formError}</span>}
      </form>
      {repos.length && <RepoTable repos={repos} />}
    </main>
  );
}
