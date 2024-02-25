import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";

type Props = DialogProps & {
  title: string;
  children: React.ReactNode;
  onClose: VoidFunction;
  action?: JSX.Element;
};

/**
 * Wrapper for modal components for cleaner code
 */
function ModalWrapper({ title, children, action, onClose, ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      {action && <DialogActions>{action}</DialogActions>}
    </Dialog>
  );
}

export default ModalWrapper;
