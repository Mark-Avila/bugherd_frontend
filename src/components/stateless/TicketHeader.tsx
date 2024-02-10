import { Avatar, Chip, Stack, Tooltip, Typography } from "@mui/material";

interface Props {
  issueProject: string;
  issueNumber: string;
  title: string;
  author: string;
  createdAt: string;
  archived?: boolean;
}

function TicketHeader({
  issueProject,
  issueNumber,
  title,
  author,
  createdAt,
  archived,
}: Props) {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {`${issueProject} #${issueNumber}`}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography mt={2} variant="h4">
          {title}
        </Typography>
        {archived && (
          <Tooltip title="This Ticket's Project has been archived">
            <Chip label="Archived" color="warning" />
          </Tooltip>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" mt={2}>
        <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography variant="body2" fontWeight="bold">
          {author}
          {"   "}
          <Typography variant="body2" component="span" color="text.secondary">
            {createdAt}
          </Typography>
        </Typography>
      </Stack>
    </>
  );
}

export default TicketHeader;
