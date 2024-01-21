import { ListItemButton, ListItemText } from "@mui/material";

interface Props {
  title: string;
  descr: string;
}

function ManageProjectsItem({ title, descr }: Props) {
  return (
    <ListItemButton divider>
      <ListItemText primary={title} secondary={descr} />
    </ListItemButton>
  );
}

export default ManageProjectsItem;
