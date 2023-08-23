import { Box, Typography } from "@mui/material";

function ProjectTicketIdentity() {
  return (
    <>
      <Box>
        <Typography fontSize="small" color="text.secondary">
          Title
        </Typography>
        <Typography variant="body2" fontSize="small">
          My Ticket Title
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography fontSize="small" color="text.secondary">
          Author
        </Typography>
        <Typography variant="body2" fontSize="small">
          Mark Avila
        </Typography>
      </Box>
      <Box marginTop={2}>
        <Typography fontSize="small" color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2" fontSize="small">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. A soluta, at
          similique vel nostrum adipisci sunt esse molestias iusto est.
          Excepturi veritatis laudantium modi saepe ullam consequuntur ipsum
          totam deserunt.
        </Typography>
      </Box>
    </>
  );
}

export default ProjectTicketIdentity;
