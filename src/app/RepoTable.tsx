import { Repository } from "./types";
import { format, parseISO } from "date-fns";

interface RepoTableProps {
  repos: Repository[];
}
export const RepoTable = (props: RepoTableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Created
          </th>
          <th scope="col" className="px-6 py-3">
            Updated
          </th>
          <th scope="col" className="px-6 py-3">
            Pushed
          </th>
        </tr>
      </thead>
      <tbody>
        {props.repos.map((repo) => (
          <tr
            key={repo.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{repo.name}</td>
            <td className="px-6 py-4">{repo.description}</td>
            <td className="px-6 py-4">
              {format(parseISO(repo.created_at), "dd-MM-yyyy")}
            </td>
            <td className="px-6 py-4">
              {format(parseISO(repo.updated_at), "dd-MM-yyyy")}
            </td>
            <td className="px-6 py-4">
              {format(parseISO(repo.pushed_at), "dd-MM-yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
