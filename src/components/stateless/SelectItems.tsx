import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SelectItem } from "../../types";

interface Props {
  value: string;
  items: SelectItem[];
  label: string;
  id: string;
  onChange: (event: SelectChangeEvent) => void;
}

function CustomSelect({ items, onChange, value, label, id }: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-label}`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label}`}
        label={label}
        onChange={onChange}
        value={value}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
