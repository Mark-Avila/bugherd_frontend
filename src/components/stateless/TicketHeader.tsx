import { Avatar, Stack, Typography } from "@mui/material";

interface Props {
  issueProject: string;
  issueNumber: string;
  title: string;
  author: string;
  createdAt: string;
}

function TicketHeader({
  issueProject,
  issueNumber,
  title,
  author,
  createdAt,
}: Props) {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {`${issueProject} #${issueNumber}`}
      </Typography>
      <Typography mt={2} variant="h4">
        {title}
      </Typography>
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
