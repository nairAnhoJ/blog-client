import axios from "@/axios";

const resource = '/users';

export const usersIndex = () => axios.get(resource);

export const createUser = (user) => axios.post(resource, user);

export const editUser = (id) => axios.get(`${resource}/${id}/edit`);

export const updateUser = (id, user) => axios.put(`${resource}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${resource}/${id}`);

export const resetUser = (id) => axios.patch(`${resource}/${id}/reset`);