// @ts-nocheck
import * as React from 'react';
import { FC, useState } from 'react'
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import theme from '../theme';

type DeleteConfirmModalProps = {
  idString: string;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ idString }) => {
  
  const [open, setOpen] = React.useState(false);
   /* Handle Deleting an employee */
   const handleDelete = async (e: { preventDefault: () => void; }) => {
    setOpen(false);
    e.preventDefault();
    try {
        
        /* Delete user from the database with specified unique id*/
        const response = await fetch(`/api/users?id=${encodeURIComponent(idString)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }

        const user = await response.json();

        /* Show a success message and reload the page immediately */
        console.log("Employee was successfully deleted - refresh the page");
        location.reload(); /* Reload page to see change was successful */
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};
  
  return (
        
    <React.Fragment>
      <Button type="button" onClick={() => setOpen(true)} 
  sx={{ paddingLeft: '10%', textIndent:'5.5px', 
  paddingRight:'10%', borderRadius:'25px', 
  backgroundColor: theme.palette.primary.main, 
  '&:hover': {backgroundColor:"#2E0057"}, textTransform: 'none'}} >Delete Employee
  </Button>
      {/* <Button
        variant="outlined"
        color="danger"
        // endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button> */}
      <Modal open={open} onClose={() => setOpen(false)}>
  
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete the profile?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete Profile
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
export default DeleteConfirmModal