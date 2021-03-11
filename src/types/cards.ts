import { SortParams } from '@/types/sort';

export enum CardsActionTypes {
  SET_CARDS = 'SET_CARDS',
  SET_SORTED_CARDS = 'SET_SORTED_CARDS',
  EDIT_CARD = 'EDIT_CARD',
  ADD_CARD = 'ADD_CARD',
}

interface IObjectKeys {
  [key: string]: string | number;
}

export interface CardType extends IObjectKeys {
  id: number
  name: string
  description: string
  priority: number
  createDate: number,
  statusId: number,
}

export interface SetCardsAction {
  type: CardsActionTypes.SET_CARDS,
  payload: CardType[],
}

export interface SetSortedCardsPayload {
  items: CardType[],
  sortBy: SortParams,
}

export interface SetSortedCardsAction {
  type: CardsActionTypes.SET_SORTED_CARDS,
  payload: SetSortedCardsPayload,
}

export interface EditCardAction {
  type: CardsActionTypes.EDIT_CARD,
  payload: CardType,
}

export interface AddCardAction {
  type: CardsActionTypes.ADD_CARD,
  payload: CardType,
}

export interface CardsState {
  items: CardType[],
}

export type CardsAction = 
  SetCardsAction
  | EditCardAction
  | AddCardAction
  | SetSortedCardsAction;
  