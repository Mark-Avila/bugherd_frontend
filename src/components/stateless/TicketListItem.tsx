import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const handleOnClick = () => {
    navigate(`/ticket/${props.id}`);
  };

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        !smallScreen && (
          <TicketItemChips status={props.status} priority={props.priority} />
        )
      }
    >
      <ListItemButton onClick={handleOnClick}>
        <Stack>
          <ListItemText
            primary={props.title}
            secondary={`#${props.number} - ${props.author} - opened on ${props.created}`}
            secondaryTypographyProps={{
              fontSize: "small",
            }}
          />
          {smallScreen && (
            <Box mt={2} mb={1}>
              <TicketItemChips
                status={props.status}
                priority={props.priority}
              />
            </Box>
          )}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

export default TicketListItem;
