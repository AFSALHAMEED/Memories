import axios from 'axios';


const API = axios.create({baseURL:"http://localhost:5000"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("token")){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
    }
    return req
})

export const fetchPost = ()=> API.get("/posts")

export const createPost = (newPost) => API.post("/posts",newPost)

export const updatePost =(id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likedPost = (id) => API.patch(`/posts/${id}/likePost`) 

export const signIn = (formData) => API.post("/user/signIn",formData)
export const signUp = (formData) => API.post("/user/signUp",formData)