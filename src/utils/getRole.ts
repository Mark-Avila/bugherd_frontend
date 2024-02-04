const getRole = (role: number) => {
  let role_str = "Developer";

  if (role === 1) {
    role_str = "Project Manager";
  } else if (role === 2) {
    role_str = "Administrator";
  }

  return role_str;
};

export default getRole;
