import { SortAction, SortParams } from '@/types/types';

export const setSort = (payload: SortParams): SortAction => ({
  type: 'SET_SORT',
  payload,
});
