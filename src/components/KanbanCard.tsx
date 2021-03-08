import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '@/hooks/useModal';
import { editCard as editCardAction } from '@/redux/actions/cards';
import { 
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Close } from '@material-ui/icons';

interface KanbanCardProps {
  id: number
  name: string
  description: string
  priority: number
  createDate: number,
  statusId: number,
}

const useStyles = makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 10,
    fontSize: 35,
    cursor: 'pointer',
    zIndex: 10,
    '&:hover': {
      color: '#6462e2',
    },
  },
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
  editButton: {
    marginRight: 10,
  },
  editIcon: {
    fontSize: 14,
    marginRight: '.2em',
    marginTop: '-.1em',
  },
}));

const getFormatedDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
}

export const KanbanCard: React.FC<KanbanCardProps> = React.memo(({
  id,
  name,
  description,
  createDate,
  priority,
  statusId,
}) => {
  const dispatch = useDispatch();
  const { modal, handleModal } = useModal(false);
  const [editCard, setEditCard] = useState(false);
  const [cardName, setCardName] = useState(name);
  const [cardDescription, setCardDescription] = useState(description);
  const classes = useStyles();

  const handleModalClose = () => {
    setEditCard(false);
    handleModal();
  }

  const handleEditCard = () => {
    setEditCard(!editCard);
  }

  const handleSaveCard = () => {
    dispatch(editCardAction({
      id,
      name: cardName,
      description: cardDescription,
      createDate,
      priority,
      statusId
    }));
    setEditCard(!editCard);
  }

  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;

    switch (ev.target.id) {
      case 'name':
        setCardName(newValue);
        break;
      case 'description':
        setCardDescription(newValue);
        break;
    }
  }

  return (
    <Card
      variant="outlined" 
      className={classes.card}
      onClick={handleModal}
    >
      <Box p={1}>
        <Typography variant="subtitle1">{cardName} (priority: {priority})</Typography>
      </Box>

      <Dialog
        open={modal || editCard}
        fullWidth
        maxWidth="sm"
        aria-labelledby="dialog-title"
      >
        <Close
          onClick={handleModalClose} 
          className={classes.closeButton}
        />
        <DialogTitle id="dialog-title">
          {
            !editCard 
            ? cardName 
            : <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                rowsMax={5}
                multiline
                value={cardName}
                onChange={handleInput}
              />
          }
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div>
            {
              !editCard 
              ? cardDescription
              : <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  rows={3}
                  rowsMax={5}
                  multiline
                  value={cardDescription}
                  onChange={handleInput}
                />
            }
          </div>  
          <DialogContentText className={classes.cardBottom}>
            {!editCard ? (
              <Button 
                variant="outlined"
                size="small"
                className={classes.editButton}
                onClick={handleEditCard}
              >
                <Edit className={classes.editIcon} />
                Edit
              </Button>
            ) : (
              <Button 
                variant="contained"
                color="secondary"
                size="small"
                className={classes.editButton}
                onClick={handleSaveCard}
              >
                Ok
              </Button>
            )}
            {`Created at: ${getFormatedDate(createDate)}`}
          </DialogContentText>  
        </DialogContent>
      </Dialog>  
    </Card>
  )
});
