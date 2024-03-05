import { Repository, Sort } from "./types";
import { format, parseISO } from "date-fns";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface RepoTableProps {
  repos: Repository[];
  handleSortChange: (sortField: Sort) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
}

export const RepoTable = (props: RepoTableProps) => {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-6">
        <thead className="text-xs text-gray-700 uppercase md:border-none bg-gray-50 border-b-4">
          <tr className="flex flex-col flex-no wrap md:table-row">
            <th
              scope="col"
              className="hover:cursor-pointer px-6 py-3 md:border-none border-b border-dashed"
              onClick={() => props.handleSortChange(Sort.FULL_NAME)}
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
              className="hover:cursor-pointer px-6 py-3 md:border-none border-b border-dashed"
              onClick={() => props.handleSortChange(Sort.CREATED)}
            >
              Created
            </th>
            <th
              scope="col"
              className="hover:cursor-pointer px-6 py-3 md:border-none border-b border-dashed"
              onClick={() => props.handleSortChange(Sort.UPDATED)}
            >
              Updated
            </th>
            <th
              scope="col"
              className="hover:cursor-pointer px-6 py-3"
              onClick={() => props.handleSortChange(Sort.PUSHED)}
            >
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

      <Stack spacing={2}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          onChange={props.handlePageChange}
          page={props.page}
        />
      </Stack>
    </>
  );
};
