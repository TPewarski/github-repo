// api types
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum Sort {
  CREATED = "created",
  UPDATED = "updated",
  PUSHED = "pushed",
  FULL_NAME = "full_name",
}

export enum Type {
  ALL = "all",
  OWNER = "owner",
  FORKS = "forks",
  SOURCES = "sources",
  MEMBER = "member",
}

export type Repository = {
  id: number;
  name: string;
  description: string;
  created: string;
  updated: string;
  pushed: string;
};
