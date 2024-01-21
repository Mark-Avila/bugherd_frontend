import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";

type Props = TextFieldProps & {
  withAutoComplete?: boolean;
  icon?: React.ReactElement<typeof Search>;
  options?: unknown[];
  getOptionLabel?: (option: unknown) => string;
};

function SearchField({
  icon,
  options,
  getOptionLabel,
  withAutoComplete,
  ...props
}: Props) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" useFlexGap>
      {withAutoComplete ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options || []}
          getOptionLabel={getOptionLabel}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} {...props} />}
        />
      ) : (
        <TextField {...props} />
      )}
      <IconButton>{icon || <Search />}</IconButton>
    </Stack>
  );
}

export default SearchField;
