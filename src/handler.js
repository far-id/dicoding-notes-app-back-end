import { nanoid } from 'nanoid';
import notes from './notes.js';
// POST
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
        newNote,
        notes
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};


const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
})

const getNoteByIdHandlred = (request, h) => {
  const note = notes.filter((n) => n.id === request.params.id)[0]
  if(note !== undefined){
    const response = h.response({
      status: 'success',
      data: {note},
    });
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
    data: {}
  });
  response.code(404);
  return response;
}

const editNoteByIdHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toString();

  const index = notes.findIndex(n => n.id === request.params.id )

  if (index !== -1) {
    notes[index] = { 
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui'
    });

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
  })

  response.code(404);
  return response;
}


const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex(n => n.id === id)

  if(index !== -1){
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    })

    response.code(200);
    return response;
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
}

export { addNoteHandler, getAllNotesHandler, getNoteByIdHandlred, editNoteByIdHandler, deleteNoteByIdHandler };