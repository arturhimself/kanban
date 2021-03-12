import React, { useState, useMemo, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers/.'
import { useModal } from '@/hooks/useModal';
import { editCard as editCardAction } from '@/redux/actions/cards';
import { 
  Card,
  Chip,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardModal } from '@/components/CardModal';

export interface KanbanCardProps {
  id: number
  name: string
  description: string
  priority: number
  createDate: number,
  statusId: number,
}

export interface Priority {
  order: number,
  color: string,
}

export interface CardEditState {
  name: string,
  description: string,
  priority: number,
  statusId: number,
}

const priorities: Priority[] = [
  {
    order: 2,
    color: 'red'
  },
  {
    order: 1,
    color: 'yellow'
  },
  {
    order: 0,
    color: 'green'
  }
];

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: 15,
    cursor: 'pointer',
    transition: '.2s',
    '&:hover': {
      background: '#f5f5f5',
    },
  },
  cardBottom: {
    marginTop: 20,
  },
  priority: {
    width: 30,
    height: 6,
    '&._red': {
      background: 'red',
    },
    '&._yellow': {
      background: '#d4d414',
    },
    '&._green': {
      background: 'green',
    },
  },
}));

export const KanbanCard: React.FC<KanbanCardProps> = React.memo(({
  id,
  name,
  description,
  createDate,
  priority,
  statusId,
}) => {
  const dispatch = useDispatch();
  const { items: lists } = useSelector(({ lists }: RootState) => lists);
  const { modal, handleModal } = useModal(false);
  const [editCard, setEditCard] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardEditState>({
    name,
    description,
    priority,
    statusId,
  });
  const classes = useStyles();

  const handleModalClose = () => {
    setEditCard(false);
    handleModal();
  }

  const handleEditCard = () => {
    setEditCard(!editCard);
  }

  const handleSaveCard = () => {
    if (errorName) {
      cardInfo.name = name;
      setErrorName(false);
      return;
    };

    dispatch(editCardAction({
      id,
      createDate,
      ...cardInfo,
    }));

    setEditCard(false);
  }

  const handleEditForm = (
    ev: ChangeEvent<HTMLInputElement | { value: unknown, name?: any }>
  ) => {
    const value = ev.target.value;
    const name = ev.target.name;

    if (name === 'name' && value === '') {
      setErrorName(true);
    } else if (name === 'name') {
      setErrorName(false);
    }

    setCardInfo({
      ...cardInfo,
      [ev.target.name]: value,
    });
  }

  const getPriority = useMemo((): string | undefined => (
    priorities.find((item) => item.order === cardInfo.priority)?.color
  ), [cardInfo]);


  const propsForModal = {
    modal,
    editCard,
    handleModalClose,
    cardInfo,
    handleEditForm,
    handleSaveCard,
    handleEditCard,
    createDate,
    priority: getPriority,
    lists,
    errorName,
  }

  return (
    <Card
      variant="outlined" 
      className={classes.card}
      onClick={handleModal}
    >
      <Box p={1}>
        {getPriority && <Chip className={`${classes.priority} _${getPriority}`}></Chip>}
        <Typography variant="subtitle1">{cardInfo.name}</Typography>
      </Box>

      <CardModal {...propsForModal} />
    </Card>
  )
});
