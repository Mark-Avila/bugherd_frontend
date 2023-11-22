import { Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { RoleUserItem } from "../components";

function RoleAssignment() {
  return (
    <>
      <PageSection
        title="Manage Roles"
        primaryTypographyProps={{ fontSize: 32 }}
      >
        <Typography>Assign or modify roles of users</Typography>
      </PageSection>

      <PageSection title="Administrators" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
        </Stack>
      </PageSection>
      <PageSection title="Project Managers" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
        </Stack>
      </PageSection>
      <PageSection title="Developers" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
          <RoleUserItem name="Mark Avila" email="markavila.dev@gmail.com" />
        </Stack>
      </PageSection>
    </>
  );
}

export default RoleAssignment;
