import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface MyModalProps {
  open: boolean;
  onClose: () => void;
}

const MyModal: FC<MyModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="body1">This is the content of the modal.</Typography>
      </Box>
    </Modal>
  );
};

export default MyModal;