import blogService from "../services/blogs"

export const like = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: "LIKE",
      data: { id: blog.id }
    })
  }
}


export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch( {
      type: "NEW_BLOG",
      data: newBlog
    }
    )
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    await blogService.addComment(blog.id, comment)
    dispatch( {
      type: "ADD_COMMENT",
      data: { id: blog.id, comment }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: "REMOVE_BLOG",
      data: id
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case "LIKE": {
    const blog = state.find(el => el.id === action.data.id)
    const newBlog = { ...blog, likes: blog.likes + 1 }
    return state.map(el => el.id !== action.data.id ? el : newBlog)
  }
  case "ADD_COMMENT": {
    const blog = state.find(el => el.id === action.data.id)
    const newBlog = { ...blog, comments: blog.comments.concat(action.data.comment) }
    return state.map(el => el.id !== action.data.id ? el : newBlog)
  }
  case "NEW_BLOG":
    return [action.data, ...state]
  case "REMOVE_BLOG":
    return state.filter(el => el.id !== action.data)
  case "INIT_BLOGS":
    return action.data
  default:
    return state
  }
}

export default blogReducer