import config from "../../config/config.json";
import { UserPost } from "../../types/User/UserCreateType";
import { UserGet } from "../../types/User/UserType";

const baseUrl = config.baseUrl;

export const updateUsers = async (userData: UserPost) => {
  const response = await fetch(`${baseUrl}/user/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const getUsersById = async (id: number): Promise<UserGet> => {
  const response = await fetch(`${baseUrl}/user/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
