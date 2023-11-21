import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import TicketItemChips from "./TicketItemChips";
import { useNavigate } from "react-router-dom";
import { Priority } from "../../types";

interface Props {
  id: string;
  title: string;
  number: string;
  author: string;
  created: string;
  priority: Priority;
  status: boolean;
}

function TicketListItem(props: Props) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/ticket/${props.id}`);
  };

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <TicketItemChips status={props.status} priority={props.priority} />
      }
    >
      <ListItemButton onClick={handleOnClick}>
        <ListItemText
          primary={props.title}
          secondary={`#${props.number} - ${props.author} - opened on ${props.created}`}
          secondaryTypographyProps={{
            fontSize: "small",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TicketListItem;
