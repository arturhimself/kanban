import { useState } from 'react';

export const useModal = (initialValue: boolean) => {
  const [modal, setModal] = useState(initialValue);

  const handleModal = () => {
    setModal(!modal);
  }

  return {
    modal,
    handleModal,
  }
};