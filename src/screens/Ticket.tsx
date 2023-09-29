import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TicketDetails from "../components/stateless/TicketDetails";
import PageSection from "../components/stateless/PageSection";
import CommentItem from "../components/stateless/CommentItem";
import CommentInput from "../components/stateless/CommentInput";

function Ticket() {
  return (
    <Box>
      <Box component="header">
        <Typography variant="h4">
          Can't log in{" "}
          <Typography component="span" color="text.secondary">
            #423
          </Typography>
        </Typography>
        <Stack direction="row" alignItems="center" mt={2}>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
          <Typography variant="body2" fontWeight="bold">
            Mark Christian Avila{"   "}
            <Typography variant="body2" component="span" color="text.secondary">
              Opened 3 days ago
            </Typography>
          </Typography>
        </Stack>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={9}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repudiandae ut consequuntur odio sint quos amet quia soluta cumque
              alias nostrum, veniam dolorem, unde iste? Perferendis cum
              voluptatibus corporis beatae inventore. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Omnis officia, ut sint ipsa
              quasi et amet voluptatum consequatur, rem unde eligendi eaque
              magni quam fuga natus, neque vel saepe soluta. Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Repudiandae ut consequuntur
              odio sint quos amet quia soluta cumque alias nostrum, veniam
              dolorem, unde iste? Perferendis cum voluptatibus corporis beatae
              inventore. Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Omnis officia, ut sint ipsa quasi et amet voluptatum
              consequatur, rem unde eligendi eaque magni quam fuga natus, neque
              vel saepe soluta.Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Repudiandae ut consequuntur odio sint quos amet
              quia soluta cumque alias nostrum, veniam dolorem, unde iste?
              Perferendis cum voluptatibus corporis beatae inventore. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Omnis officia,
              ut sint ipsa quasi et amet voluptatum consequatur, rem unde
              eligendi eaque magni quam fuga natus, neque vel saepe soluta.Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae ut
              consequuntur odio sint quos amet quia soluta cumque alias nostrum,
              veniam dolorem, unde iste? Perferendis cum voluptatibus corporis
              beatae inventore. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Omnis officia, ut sint ipsa quasi et amet
              voluptatum consequatur, rem unde eligendi eaque magni quam fuga
              natus, neque vel saepe soluta.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Box my={2}>
            <TicketDetails />
          </Box>
        </Grid>
      </Grid>
      <PageSection title="Comments" marginTop={3}>
        <List aria-label="ticket-comments-list" disablePadding>
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </List>
        <Divider />
        <CommentInput />
      </PageSection>
    </Box>
  );
}

export default Ticket;
