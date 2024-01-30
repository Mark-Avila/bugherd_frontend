import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  descr: string;
  onClose: VoidFunction;
  onYes: VoidFunction;
  onNo: VoidFunction;
  yesText?: string;
  noText?: string;
}

function ConfirmDialog({
  open,
  title,
  descr,
  onClose,
  onYes,
  onNo,
  yesText,
  noText,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {descr}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNo}>{noText ? noText : "No"}</Button>
        <Button onClick={onYes} autoFocus>
          {yesText ? yesText : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
