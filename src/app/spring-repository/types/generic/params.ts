export interface PageParams {
  page?: number;
  size?: number;
  sort?: SortPageParams;
}

export interface SortPageParams {
  [property: string]: 'asc' | 'desc';
}

export interface RepositoryParams {
  pageParams?: PageParams;

  [param: string]: any;
}
