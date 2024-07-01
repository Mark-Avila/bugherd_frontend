import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SelectItemBody, Type } from "../../types";
import { useContext } from "react";
import { ColorModeContext } from "../../App";

interface Props {
  value: string;
  items: SelectItemBody<unknown>[];
  label: string;
  name: string;
  id: string;
  error: boolean | undefined;
  onChange: (event: SelectChangeEvent) => void;
}

function SelectItems({
  name,
  items,
  onChange,
  value,
  label,
  id,
  error,
}: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-label}`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label}`}
        label={label}
        name={name}
        onChange={onChange}
        error={error}
        value={value}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value as Type}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectItems;
