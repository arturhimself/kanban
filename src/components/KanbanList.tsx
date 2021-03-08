import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormDataType } from '@/types/types';
import { CardType } from '@/types/cards';
import { RootState } from '@/redux/reducers/.'
import { 
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { KanbanCard } from '@/components/KanbanCard';
import { addCard, setSortedCards } from '@/redux/actions/cards';

interface KanbanListProps {
  id: number,
  name: string,
  cards: CardType[]
}

const useStyles = makeStyles(() => ({
  kanbanList: {
    height: '100%'
  },
  kanbanListTitle: {
    marginBottom: '.5rem',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 10,
    fontSize: 35,
    cursor: 'pointer',
    '&:hover': {
      color: '#6462e2',
    }
  },
}));

export const KanbanList: React.FC<KanbanListProps> = React.memo(({
  id,
  name,
  cards,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items: allCards } = useSelector(({ cards }: RootState) => cards);
  const { sortBy } = useSelector(({ sort }: RootState) => sort);
  const [openModal, setOpenModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', description: '' });

  const handleCreate = (ev: SyntheticEvent) => {
    ev.preventDefault();

    dispatch(addCard({
      ...createForm,
      id: 100,
      priority: 0,
      createDate: Date.now(),
      statusId: id,
    }));
    
    dispatch(setSortedCards({
      items: allCards,
      sortBy,
    }));

    setOpenModal(!openModal);
  }

  const handleCreateModal = () => {
    setOpenModal(!openModal);
  }

  const handleCreateForm = (ev: ChangeEvent<HTMLInputElement>) => {
    const formData: FormDataType = {};

    switch (ev.target.id) {
      case 'name':
        formData.name = ev.target.value;
        break;
      case 'description':
        formData.description = ev.target.value;
        break;
    }

    setCreateForm({ 
      ...createForm,
      ...formData,
    });
  }

  return (
    <Paper className={classes.kanbanList}>
      <Box p={2}>
        <Box mb={2}>
          <Typography className={classes.kanbanListTitle} variant="h4">{name}</Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small"
            onClick={handleCreateModal}
            startIcon={<Add />}
          >
            ADD
          </Button>
        </Box>
        {cards && cards.map((card) => <KanbanCard key={card.id} {...card} />)}
      </Box>

      <Dialog 
        open={openModal} 
        onClose={handleCreateModal}
        fullWidth
        maxWidth="sm"
        aria-labelledby="dialog-title"
      >
        <Close
          onClick={handleCreateModal} 
          className={classes.closeButton}
        />
        <DialogTitle id="dialog-title">Create task</DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={handleCreate}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={handleCreateForm}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              rows={3}
              rowsMax={7}
              multiline
              onChange={handleCreateForm}
            />
            <Box pt={2} pb={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Create
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  )
});
