import { combineReducers } from 'redux';
import { cards } from './cards';
import { lists } from './lists';
import { sort } from './sort';

export const rootReducer = combineReducers({
  cards,
  lists,
  sort,
});

export type RootState = ReturnType<typeof rootReducer>
