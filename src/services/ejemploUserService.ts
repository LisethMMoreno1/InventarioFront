// services/UserService.ts

import { UserPost } from "../types/User/UserCreateType";
import { UserGet } from "../types/User/UserType";
import fetchFromAPI from "./ApiService";


export const UserService = {
  getUsers: async () => {
    return await fetchFromAPI('users'); // GET http://localhost:3000/api/users
  },

  getUserById: async (id: number) => {
    return await fetchFromAPI(`users/${id}`); // GET http://localhost:3000/api/users/1
  },

  createUser: async (userData: any) => {
    return await fetchFromAPI('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // POST http://localhost:3000/api/users
    });
  },

  updateUser: async (identificationNumber: string, userData: UserPost) => {
    return await fetchFromAPI(`user/${identificationNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // PUT http://localhost:3000/api/users/1
    });
  },

  deleteUser: async (id: number) => {
    return await fetchFromAPI(`users/${id}`, {
      method: 'DELETE',
    }); // DELETE http://localhost:3000/api/users/1
  },
};
