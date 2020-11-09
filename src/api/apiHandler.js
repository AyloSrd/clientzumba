import axios from "axios"

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data)
    throw error
  }
  throw error
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getStudentNotes(studentId) {
    return service
      .get(`/api/notes/all/${studentId}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getNote(id) {
    return service
      .get(`/api/notes/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  createNote(note) {
    return service 
      .post('/api/notes', note)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteNote(id) {
    return service 
      .delete(`/api/notes/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  
  getStudentLessons(studentId) {
    return service
      .get(`/api/lessons/student/${studentId}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getTeacherLessons(teacherId) {
    return service
      .get(`/api/lessons/student/${teacherId}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getLesson(id) {
    return service
      .get(`/api/lessons/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  createLesson(lesson) {
    return service 
      .post('/api/lessons', lesson)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteLesson(id) {
    return service 
      .delete(`/api/lessons/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  }
  
}
