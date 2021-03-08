export interface SortParams {
  type: string,
  order: string,
}

export interface SortState {
  sortBy: SortParams,
}

export interface SortAction {
  type: string,
  payload: SortParams,
}