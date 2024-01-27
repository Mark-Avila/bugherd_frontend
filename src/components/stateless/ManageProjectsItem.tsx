import { ListItemButton, ListItemText } from "@mui/material";

interface Props {
  title: string;
  descr: string;
  onClick?: VoidFunction;
}

function ManageProjectsItem({ title, descr, onClick }: Props) {
  return (
    <ListItemButton divider onClick={onClick}>
      <ListItemText primary={title} secondary={descr} />
    </ListItemButton>
  );
}

export default ManageProjectsItem;
