import { SelectItem } from "../types";

const status: SelectItem[] = [
  {
    value: "ongoing",
    label: "Ongoing",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

const priority: SelectItem[] = [
  {
    value: "high",
    label: "High",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "low",
    label: "Low",
  },
];

const types: SelectItem[] = [
  {
    value: "issue",
    label: "Issue",
  },
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "error",
    label: "Error",
  },
  {
    value: "other",
    label: "Other",
  },
];

const ticketSelects = {
  types,
  priority,
  status,
};

export default ticketSelects;
