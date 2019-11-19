export interface PageInfo {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}

export interface Page<T> extends PageInfo {
  content: T[];
  last: boolean;
  first: boolean;
  empty: boolean;
  numberOfElements: number;
}
