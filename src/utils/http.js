import Axios from 'axios'


export const register = (body) => {
  return Axios.post(`http://192.168.43.73:5000/auth/register`, body)
}

export const loginUser = (body) => {
  return Axios.post(`http://192.168.43.73:5000/auth/login`, body)
}
export const tokenUser = (body) => {
  return Axios.post(`http://192.168.43.73:5000/auth/token`, body)
}

export const getBooks = (data) => {
  return Axios.get(`http://192.168.43.73:5000/books?${data}`)
}

// export const getBookById = (id) => {
//   return Axios.get(`http://192.168.43.73:5000/books/${id}`,
//     {
//       headers: {
//         "Authorization": localStorage.getItem("token")
//       }
//     })
// }

export const getBookByRecommended = () => {
  return Axios.get(`http://192.168.43.73:5000/books/recommended`)
}

export const postBook = (body, token) => {
  return Axios.post(`http://192.168.43.73:5000/books`, body,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const putBook = (id, body) => {
  return Axios.put(`${process.env.REACT_APP_URL}/books/${id}`, body,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const deleteBook = (id) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/books/${id}`,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

}

export const getAuthor = (token) => {
  return Axios.get(`http://192.168.43.73:5000/author`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const postAuthor = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/author`, body,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const putAuthor = (id, body) => {
  return Axios.put(`${process.env.REACT_APP_URL}/author/${id}`, body,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const deleteAuthor = (id) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/author/${id}`,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const getGenre = (token) => {
  return Axios.get(`http://192.168.43.73:5000/genre`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const postGenre = (body) => {
  return Axios.post(`${process.env.REACT_APP_URL}/genre`, body,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const putGenre = (id, body) => {
  return Axios.put(`${process.env.REACT_APP_URL}/genre/${id}`, body,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const deleteGenre = (id) => {
  return Axios.delete(`${process.env.REACT_APP_URL}/genre/${id}`,
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
}

export const getStatus = (token) => {
  return Axios.get(`http://192.168.43.73:5000/status`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const borrowBook = (id, body, token) => {
  return Axios.put(`http://192.168.43.73:5000/books/user/${id}`, body,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const getBorrow = (token) => {
  return Axios.get(`http://192.168.43.73:5000/borrow`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const getBorrowById = (id, token) => {
  return Axios.get(`http://192.168.43.73:5000/borrow/${id}`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const postBorrow = (body, token) => {
  return Axios.post(`http://192.168.43.73:5000/borrow`, body,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const putBorrow = (body, token) => {
  return Axios.put(`http://192.168.43.73:5000/borrow`, body,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const getOrder = (token) => {
  return Axios.get(`http://192.168.43.73:5000/order`,
    {
      headers: {
        "Authorization": token
      }
    })
}

export const postOrder = (body, token) => {
  return Axios.post(`http://192.168.43.73:5000/order`, body,
    {
      headers: {
        "Authorization": token
      }
    })
}
