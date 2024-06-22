import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";

interface Props {
  issueProject: string;
  issueNumber: string;
  title: string;
  author: string;
  createdAt: string;
  archived?: boolean;
  isAuthor?: boolean;
  onUpdateClick?: VoidFunction | null;
}

function TicketHeader({
  issueProject,
  issueNumber,
  title,
  author,
  createdAt,
  archived,
  onUpdateClick,
  isAuthor,
}: Props) {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {`${issueProject} #${issueNumber}`}
      </Typography>
      <Stack direction="row" justifyContent="space-between">
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
        {isAuthor && onUpdateClick && (
          <Button variant="contained" size="small" onClick={onUpdateClick}>
            Update Ticket
          </Button>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
        <Typography variant="body2" fontWeight="bold">
          {author}
        </Typography>
        <Typography variant="body2" component="span" color="text.secondary">
          {createdAt}
        </Typography>
      </Stack>
    </>
  );
}

export default TicketHeader;
