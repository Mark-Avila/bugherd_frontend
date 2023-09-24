import { Stack, Avatar, TextField, Box, Button } from "@mui/material";

function CommentInput() {
  return (
    <Stack direction="column">
      <Stack
        direction="row"
        alignItems="start"
        gap={2}
        sx={{ padding: 2, paddingBottom: 1 }}
      >
        <div>
          <Avatar alt="markavila-pic" />
        </div>
        <Box sx={{ width: "100%" }}>
          <TextField
            variant="outlined"
            multiline
            rows={3}
            placeholder="Enter Comment"
            fullWidth
          />
        </Box>
      </Stack>
      <Box
        sx={{ paddingX: 2 }}
        width="100%"
        display="flex"
        justifyContent="end"
      >
        <Button>Comment</Button>
      </Box>
    </Stack>
  );
}

export default CommentInput;
