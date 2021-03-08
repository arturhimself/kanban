import { SortAction, SortParams } from '@/types/sort';

export const setSort = (payload: SortParams): SortAction => ({
  type: 'SET_SORT',
  payload,
});
