export interface KanbanListType {
  id: number,
  name: string,
}

export interface SetListsAction {
  type: string,
  payload: KanbanListType[],
}

export interface ListsState {
  items: KanbanListType[],
}
