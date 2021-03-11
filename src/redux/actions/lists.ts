import { 
  SetListsAction,
  KanbanListType,
} from '@/types/lists';

export const SET_LISTS: string = 'SET_LISTS';

export const setLists = (payload: KanbanListType[]): SetListsAction => ({
  type: SET_LISTS,
  payload,
});

export const fetchLists = (endpoint: string) => async (dispatch: any) => {
  const response = await fetch(`https://my-json-server.typicode.com/arturhimself/kanban/${endpoint}`);
  const lists = await response.json();
  dispatch(setLists(lists));
};
