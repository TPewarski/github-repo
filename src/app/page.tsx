"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  userOrOrg: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log({ data });

  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 max-w-5xl w-1/2 flex-col justify-between font-mono text-sm lg:flex"
      >
        <label
          htmlFor="userOrOrg"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User or Organization
        </label>
        <input
          type="text"
          id="userOrOrg"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a username or organization"
          {...register("userOrOrg")}
        />
        {errors.userOrOrg && (
          <span className="text-red-500">This field is required</span>
        )}
        <button className="mt-5 bg-blue-500 w-48 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </main>
  );
}
