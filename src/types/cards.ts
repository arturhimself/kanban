import { SortParams } from '@/types/sort';

export interface CardType {
  id: number
  name: string
  description: string
  priority: number
  createDate: number,
  statusId: number,
}

export interface SetCardsAction {
  type: string,
  payload: CardType[],
}

export interface SetSortedCardsActionPayload {
  items: CardType[],
  sortBy: SortParams,
}

export interface SetSortedCardsAction {
  type: string,
  payload: SetSortedCardsActionPayload,
}

export interface EditCardAction {
  type: string,
  payload: CardType,
}

export interface AddCardAction {
  type: string,
  payload: CardType,
}

export interface CardsState {
  items: CardType[],
}

export type CardsActionTypes = 
  SetCardsAction
  | EditCardAction
  | AddCardAction
  | SetSortedCardsAction;
  