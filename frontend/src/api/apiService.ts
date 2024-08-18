import axios, { AxiosError } from 'axios';

import type NoteType from '../types/note';

const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  timeout: 2 * 60 * 1000,
  signal: AbortSignal.timeout(2 * 60 * 1000),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const postNote = async (newNote: NoteType) => {
  const response = await api.post('notes', {
    title: newNote.title,
    content: newNote.content,
  });
  return response;
};

export const patchNote = async (updatedNote: NoteType) => {
  try {
    const response = await api.put(`notes/${updatedNote.id}`, {
      title: updatedNote.title,
      content: updatedNote.content,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      // Return custom response for 404 error
      return {
        status: 404,
        error: 'Note not found',
      };
    } else {
      // Log and rethrow the error for non-404 errors
      console.log(axiosError);
      throw axiosError;
    }
  }
};

export const removeNote = async (id: string) => {
  const response = await api.delete(`notes/${id}`);
  return response;
};

export const getNotes = async () => {
  const response = await api.get('notes');
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await api.post(
    'login',
    {
      username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};

export const getUser = async () => {
  const response = await api.get('user');
  return response;
};

export const createUser = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post('users', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const deleteUser = async () => {
  const response = await api.delete('users', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
