import { KeyboardArrowRight } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface Props {
  id: number;
  title: string;
  descr: string;
  onClick?: VoidFunction;
}

function ManageProjectsItem({ id, title, descr, onClick }: Props) {
  return (
    <ListItemButton divider onClick={onClick}>
      <ListItemText primary={title} secondary={`#${id} - ${descr}`} />
      <ListItemIcon>
        <KeyboardArrowRight />
      </ListItemIcon>
    </ListItemButton>
  );
}

export default ManageProjectsItem;
