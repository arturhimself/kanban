import { 
  SetListsAction,
  KanbanListType,
} from '@/types/types';

export const setLists = (payload: KanbanListType[]): SetListsAction => ({
  type: 'SET_LISTS',
  payload,
});

export const fetchLists = (endpoint: string) => async (dispatch: any) => {
  const response = await fetch(`http://localhost:3004/${endpoint}`);
  const lists = await response.json();
  dispatch(setLists(lists));
};
