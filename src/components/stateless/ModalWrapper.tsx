import { Modal } from "@mui/material";

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: VoidFunction;
}

function ModalWrapper({ onClose, children, open }: Props) {
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={onClose}
      open={open}
    >
      <>{children}</>
    </Modal>
  );
}

export default ModalWrapper;
