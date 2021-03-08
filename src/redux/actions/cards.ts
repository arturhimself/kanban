import { 
  CardsActionTypes, 
  CardType,
  SortParams,
  SetSortedCardsActionPayload,
} from '@/types/types';

export const setCards = (payload: CardType[]): CardsActionTypes => ({
  type: 'SET_CARDS',
  payload,
});

export const setSortedCards = (payload: SetSortedCardsActionPayload): CardsActionTypes => ({
  type: 'SET_SORTED_CARDS',
  payload,
});

export const editCard = (payload: CardType): CardsActionTypes => ({
  type: 'EDIT_CARD',
  payload,
});

export const addCard = (payload: CardType): CardsActionTypes => ({
  type: 'ADD_CARD',
  payload,
});

export const fetchCards = (
  endpoint: string, 
  sortBy: SortParams
) => async (dispatch: any) => {
  const response = await fetch(`http://localhost:3004/${endpoint}?_sort=${sortBy.type}&_order=${sortBy.order}`);
  const cards = await response.json();
  dispatch(setCards(cards));
};
