import { Repository } from "./types";
import { format, parseISO } from "date-fns";

interface RepoTableProps {
  repos: Repository[];
}
export const RepoTable = (props: RepoTableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 uppercase md:border-none bg-gray-50 border-b-4">
        <tr className="flex flex-col flex-no wrap md:table-row">
          <th
            scope="col"
            className="px-6 py-3 md:border-none border-b border-dashed"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 md:border-none border-b border-dashed"
          >
            Description
          </th>
          <th
            scope="col"
            className="px-6 py-3 md:border-none border-b border-dashed"
          >
            Created
          </th>
          <th
            scope="col"
            className="px-6 py-3 md:border-none border-b border-dashed"
          >
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
            className="bg-white md:border-b border-b-4 flex flex-col flex-no wrap md:table-row"
          >
            <td className="px-6 py-4 md:border-none border-b border-dashed">
              {repo.name}
            </td>
            <td className="px-6 py-4 md:border-none border-b border-dashed">
              {repo.description}
            </td>
            <td className="px-6 py-4 md:border-none border-b border-dashed min-w-48">
              {format(parseISO(repo.created_at), "dd-MM-yyyy")}
            </td>
            <td className="px-6 py-4 md:border-none border-b border-dashed min-w-48">
              {format(parseISO(repo.updated_at), "dd-MM-yyyy")}
            </td>
            <td className="px-6 py-4 min-w-48">
              {format(parseISO(repo.pushed_at), "dd-MM-yyyy")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
