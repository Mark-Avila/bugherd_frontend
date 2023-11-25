import { Search } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";

function SearchField() {
  return (
    <Stack direction="row" spacing={2} useFlexGap>
      <TextField placeholder="Search User" size="small" />
      <IconButton>
        <Search />
      </IconButton>
    </Stack>
  );
}

export default SearchField;
