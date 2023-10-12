import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import TicketItemChips from "./TicketItemChips";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  number: string;
  author: string;
  created: string;
}

function TicketListItem(props: Props) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/ticket");
  };

  return (
    <ListItem disablePadding divider secondaryAction={<TicketItemChips />}>
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
