import * as api from "../api/index"

export const signIn =(formData) => async(dispatch)=>{
    try {
        
   const {data} = await api.signIn(formData)

   dispatch({type:"AUTH",data})


    } catch (error) {
        console.log(error);
   
    }
}
export const signUp =(formData) => async(dispatch)=>{
    try {
        const {data} = await api.signUp(formData)

        dispatch({type:"AUTH",data})


    } catch (error) {
        console.log(error);
    }
}