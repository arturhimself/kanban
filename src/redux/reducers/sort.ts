import { SortState, SortAction } from '@/types/sort';

const initialState: SortState = {
  sortBy: {
    type: 'createDate',
    order: 'asc',
  }
};

export const sort = (
    state = initialState, 
    action: SortAction,
): SortState => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
      }
    default:
      return state;  
  }
};
