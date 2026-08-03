import { nextServer } from "./api";
import type { Note } from "../../types/note";
import { Category } from "../categories";
import type { User } from "../../types/user";

// ---------- NOTES ----------

interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  query: string,
  perPage: number,
  tag?: Category | undefined,
): Promise<fetchNotesResponse> {
  const { data } = await nextServer.get<fetchNotesResponse>("/notes", {
    params: {
      page,
      search: query,
      perPage,
      tag,
    },
  });

  return data;
}

interface createNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(newNote: createNoteProps): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

// ---------- AUTH ----------

interface AuthRequest {
  email: string;
  password: string;
}

export async function register(data: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  const response = await nextServer.get("/auth/session");
  return response.status === 200;
}

// ---------- USERS ----------

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

interface UpdateMeRequest {
  username?: string;
}

export async function updateMe(payload: UpdateMeRequest): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
}
