import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers/.'
import { fetchCards, setSortedCards } from '@/redux/actions/cards';
import { fetchLists } from '@/redux/actions/lists';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
} from '@material-ui/core';
import '@/global-styles.css';
import { KanbanListType } from '@/types/lists';
import { KanbanList } from '@/components/KanbanList';
import { KanbanSort } from '@/components/KanbanSort';

const App: FC = () => {
  const dispatch = useDispatch();
  const { items: cards } = useSelector(({ cards }: RootState) => cards);
  const { items: lists } = useSelector(({ lists }: RootState) => lists);
  const { sortBy } = useSelector(({ sort }: RootState) => sort);

  useEffect(() => {
    dispatch(fetchLists('lists'));
    dispatch(fetchCards('cards', sortBy));
  }, []);

  useEffect(() => {
    dispatch(setSortedCards({
      items: cards,
      sortBy,
    }));
  }, [sortBy]);

  return (
    <Box pt={4}>
      <Container maxWidth="md">
        <Box mb={2}>
          <Typography variant="h1">Kanban</Typography>
        </Box>
        <Box mb={2}>
          <Grid 
            container
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <KanbanSort />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {lists.map(({ id, name }: KanbanListType) => (
            <Grid 
              item 
              xs={12} sm={6} md={4}
              key={id}
            >
              <KanbanList
                id={id}
                cards={cards.filter(({ statusId }) => statusId === id)}
                name={name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export { App };
