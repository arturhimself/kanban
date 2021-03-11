import { SortAction, SortParams } from '@/types/sort';

export const SET_SORT: string = 'SET_SORT';

export const setSort = (payload: SortParams): SortAction => ({
  type: SET_SORT,
  payload,
});
