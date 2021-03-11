import { 
  CardsActionTypes, 
  CardType,
  SetSortedCardsPayload,
  CardsAction,
} from '@/types/cards';
import { SortParams } from '@/types/sort';

export const setCards = (payload: CardType[]): CardsAction => ({
  type: CardsActionTypes.SET_CARDS,
  payload,
});

export const setSortedCards = (payload: SetSortedCardsPayload): CardsAction => ({
  type: CardsActionTypes.SET_SORTED_CARDS,
  payload,
});

export const editCard = (payload: CardType): CardsAction => ({
  type: CardsActionTypes.EDIT_CARD,
  payload,
});

export const addCard = (payload: CardType): CardsAction => ({
  type: CardsActionTypes.ADD_CARD,
  payload,
});

export const fetchCards = (
  endpoint: string, 
  sortBy: SortParams
) => async (dispatch: any) => {
  const response = await fetch(`https://my-json-server.typicode.com/arturhimself/kanban/${endpoint}?_sort=${sortBy.type}&_order=${sortBy.order}`);
  const cards = await response.json();
  dispatch(setCards(cards));
};
