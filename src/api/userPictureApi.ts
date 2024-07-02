const fetchUserPicture = async (userId: string): Promise<string | null> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/user/${userId}/picture`,
      {
        credentials: "include",
      }
    );

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

const uploadUserPicture = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/user/${userId}/picture`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err: unknown) {
    return false;
  }
};

const updateUserPicture = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/user/${userId}/picture`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    );

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err: unknown) {
    return false;
  }
};

const pictureApi = {
  fetchUserPicture,
  uploadUserPicture,
  updateUserPicture,
};

export default pictureApi;
