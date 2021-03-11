import { 
  CardsActionTypes,
  CardsState,
  CardType,
  CardsAction,
} from '@/types/cards';

const initialState: CardsState = {
  items: [],
};

export const cards = (
  state = initialState, 
  action: CardsAction
): CardsState => {
  switch (action.type) {
    case CardsActionTypes.SET_CARDS: {
      return { 
        ...state,
        items: action.payload,
      }
    }
    case CardsActionTypes.SET_SORTED_CARDS: {
      const newItems: CardType[] = [...state.items];
      const { type, order } = action.payload.sortBy;

      newItems.sort((a, b) => {
        if (order === 'asc') {
          if (a[type] > b[type]) return -1;
          if (a[type] < b[type]) return 1;
          return 0;
        } else {
          if (a[type] > b[type]) return 1;
          if (a[type] < b[type]) return -1;
          return 0;
        }
      });

      return { 
        ...state,
        items: newItems,
      }
    }
    case CardsActionTypes.EDIT_CARD: {
      const editItem = action.payload;
      const newItems = state.items.map((item) => {
        return item.id === editItem.id ? editItem : item;
      });

      return {
        ...state, 
        items: newItems,
      }
    }
    case CardsActionTypes.ADD_CARD: {
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
