import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const AlertDialog = ({ open, handleClose, handleConfirm, isLoading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this expense?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={handleConfirm} color="secondary" autoFocus>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
