import instance from ".";
import { NoteType } from "../types/NoteType";

const getAllNotes = async () => {
  const { data } = await instance.get("/notes");
  return data;
};

const getNote = async (noteId: string) => {
  const { data } = await instance.get(`/notes/${noteId}`);
  return data;
};

const createNote = async (noteInfo: NoteType) => {
  try {
    const { data } = await instance.post("/notes", noteInfo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateNote = async (noteInfo: NoteType) => {
  const { data } = await instance.put(`/notes/${noteInfo._id}`, noteInfo);
  return data;
};

const deleteNote = async (noteId: string) => {
  const { data } = await instance.delete(`/notes/${noteId}`);
  return data;
};

export { getAllNotes, createNote, updateNote, deleteNote, getNote };
