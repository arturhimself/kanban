import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUniqId } from '@/utils/.';
import { useModal } from '@/hooks/useModal';
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
  Select,
  MenuItem,
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
  select: {
    marginLeft: '.5rem',
  }
}));

export const KanbanList: React.FC<KanbanListProps> = React.memo(({
  id,
  name,
  cards,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items: allCards } = useSelector(({ cards }: RootState) => cards);
  const { items: lists } = useSelector(({ lists }: RootState) => lists);
  const { sortBy } = useSelector(({ sort }: RootState) => sort);
  const { modal, handleModal } = useModal(false);
  const [createForm, setCreateForm] = useState({
    name: '', 
    description: '',
    priority: 0,
    statusId: id,
  });

  const handleCreate = (ev: SyntheticEvent) => {
    ev.preventDefault();

    // Add card to redux
    dispatch(addCard({
      id: getUniqId(),
      ...createForm,
      createDate: Date.now(),
    }));
    
    // Sort cards
    dispatch(setSortedCards({
      items: allCards,
      sortBy,
    }));

    // Clear form
    setCreateForm({
      name: '',
      description: '',
      priority: 0,
      statusId: id,
    });

    // Close modal
    handleModal();
  }

  const handleCreateForm = (
    ev: ChangeEvent<HTMLInputElement | { value: unknown, name?: any }>
  ) => {
    const value = ev.target.name === 'priority'
      ? Number(ev.target.value)
      : ev.target.value;

    setCreateForm({
      ...createForm,
      [ev.target.name]: value,
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
            onClick={handleModal}
            startIcon={<Add />}
          >
            ADD
          </Button>
        </Box>
        {cards && cards.map((card) => <KanbanCard key={card.id} {...card} />)}
      </Box>

      <Dialog 
        open={modal} 
        onClose={handleModal}
        fullWidth
        maxWidth="sm"
        aria-labelledby="dialog-title"
      >
        <Close
          onClick={handleModal} 
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
              name="name"
              label="Name"
              type="text"
              value={createForm.name}
              fullWidth
              onChange={handleCreateForm}
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              value={createForm.description}
              fullWidth
              rows={3}
              rowsMax={7}
              multiline
              onChange={handleCreateForm}
            />
            <Box pt={1} pb={1}>
              Priority: 
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                value={createForm.priority}
                className={classes.select}
                onChange={handleCreateForm}
              >
                <MenuItem value={0}>Usual</MenuItem>
                <MenuItem value={1}>High</MenuItem>
                <MenuItem value={2}>Very high</MenuItem>
              </Select>
            </Box>  
            <Box pt={1} pb={1}>
              Status: 
              <Select
                labelId="priority"
                id="statusId"
                name="statusId"
                value={createForm.statusId}
                className={classes.select}
                onChange={handleCreateForm}
              >
                {lists.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
              </Select>
            </Box>
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
