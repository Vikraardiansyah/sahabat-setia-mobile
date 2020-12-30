import Axios from 'axios';
// 192.168.43
const API_URL = 'https://serene-ravine-24514.herokuapp.com';
export const register = body => {
  return Axios.post(`${API_URL}/auth/register`, body);
};

export const loginUser = body => {
  return Axios.post(`${API_URL}/auth/login`, body);
};
export const tokenUser = body => {
  return Axios.post(`${API_URL}/auth/token`, body);
};

export const getBooks = data => {
  return Axios.get(`${API_URL}/books?${data}`);
};

// export const getBookById = (id) => {
//   return Axios.get(`${API_URL}/books/${id}`,
//     {
//       headers: {
//         "Authorization": localStorage.getItem("token")
//       }
//     })
// }

export const getBookByRecommended = () => {
  return Axios.get(`${API_URL}/books/recommended`);
};

export const postBook = (body, token) => {
  return Axios.post(`${API_URL}/books`, body, {
    headers: {
      Authorization: token,
    },
  });
};

// export const putBook = (id, body) => {
//   return Axios.put(`${process.env.REACT_APP_URL}/books/${id}`, body, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

// export const deleteBook = id => {
//   return Axios.delete(`${process.env.REACT_APP_URL}/books/${id}`, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

export const getAuthor = token => {
  return Axios.get(`${API_URL}/author`, {
    headers: {
      Authorization: token,
    },
  });
};

// export const postAuthor = body => {
//   return Axios.post(`${process.env.REACT_APP_URL}/author`, body, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

// export const putAuthor = (id, body) => {
//   return Axios.put(`${process.env.REACT_APP_URL}/author/${id}`, body, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

// export const deleteAuthor = id => {
//   return Axios.delete(`${process.env.REACT_APP_URL}/author/${id}`, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

export const getGenre = token => {
  return Axios.get(`${API_URL}/genre`, {
    headers: {
      Authorization: token,
    },
  });
};

// export const postGenre = body => {
//   return Axios.post(`${process.env.REACT_APP_URL}/genre`, body, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

// export const putGenre = (id, body) => {
//   return Axios.put(`${process.env.REACT_APP_URL}/genre/${id}`, body, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

// export const deleteGenre = id => {
//   return Axios.delete(`${process.env.REACT_APP_URL}/genre/${id}`, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   });
// };

export const getStatus = token => {
  return Axios.get(`${API_URL}/status`, {
    headers: {
      Authorization: token,
    },
  });
};

export const borrowBook = (id, body, token) => {
  return Axios.put(`${API_URL}/books/user/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const getBorrow = token => {
  return Axios.get(`${API_URL}/borrow`, {
    headers: {
      Authorization: token,
    },
  });
};

export const getBorrowById = (id, token) => {
  return Axios.get(`${API_URL}/borrow/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postBorrow = (body, token) => {
  return Axios.post(`${API_URL}/borrow`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const putBorrow = (body, token) => {
  return Axios.put(`${API_URL}/borrow`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const getOrder = token => {
  return Axios.get(`${API_URL}/order`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postOrder = (body, token) => {
  return Axios.post(`${API_URL}/order`, body, {
    headers: {
      Authorization: token,
    },
  });
};
