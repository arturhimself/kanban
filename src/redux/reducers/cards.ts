import { 
  CardsActionTypes,
  CardsState,
  CardType,
} from '@/types/cards';

const initialState: CardsState = {
  items: [],
};

export const cards = (
  state = initialState, 
  action: CardsActionTypes
): CardsState => {
  switch (action.type) {
    case 'SET_CARDS': {
      return { 
        ...state,
        items: action.payload,
      }
    }
    case 'SET_SORTED_CARDS': {
      const newItems: CardType[] = [...state.items];
      const { type, order } = action.payload.sortBy;

      newItems.sort((a, b) => {
        return order === 'asc' ? b[type] - a[type] : a[type] - b[type];
      });

      return { 
        ...state,
        items: newItems,
      }
    }
    case 'EDIT_CARD': {
      const editItem = action.payload;
      const newItems = state.items.map((item) => {
        return item.id === editItem.id ? editItem : item;
      });

      return {
        ...state, 
        items: newItems,
      }
    }
    case 'ADD_CARD': {
      return { 
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      }
    }
    default:
      return state;
  }
}
