import { Priority, SelectItemBody, Type } from "../types";

const status: SelectItemBody<boolean>[] = [
  {
    value: true,
    label: "Ongoing",
  },
  {
    value: false,
    label: "Completed",
  },
];

const priority: SelectItemBody<Priority>[] = [
  {
    value: 3,
    label: "High",
  },
  {
    value: 2,
    label: "Intermediate",
  },
  {
    value: 1,
    label: "Low",
  },
];

const types: SelectItemBody<Type>[] = [
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
