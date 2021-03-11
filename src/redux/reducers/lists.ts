import { 
  SetListsAction,
  ListsState,
} from '@/types/lists';
import { SET_LISTS } from '@/redux/actions/lists';

const initialState: ListsState = {
  items: [],
};

export const lists = (
  state = initialState, 
  action: SetListsAction
): ListsState => {
  switch (action.type) {
    case SET_LISTS:
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state;
  }
};
