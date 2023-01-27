import {postDataApi} from '../../Utils/fetchData';


export const TYPES = {
    AUTH : 'AUTH'
}

export const login =  (data) => async (dispatch) => {

   try {
       
       dispatch({
           type: 'NOTIFY',
           payload: {loading : true}

       })

        const res = await postDataApi('login' , data)
        dispatch({
            type: 'AUTH',
            payload : {
                token : res.data.accessToken,
                user : res.data.user
            }
        })
        
        localStorage.setItem("First Login" , true)


        dispatch({
            type: 'NOTIFY',
            payload: {success : res.data.msg}
 
        })
 

   } catch (err) {
        console.log(err)

        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}
 
        })
   }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('First Login')
    
    if(firstLogin){
        dispatch({type: 'NOTIFY', payload: {loading : true}})

        try {
            const res = await postDataApi('refresh_token')
            dispatch({
                type : 'AUTH',
                payload : {
                    token : res.data.accessToken,
                    user : res.data.user
                }
            })

            dispatch({type: 'NOTIFY', payload: {}})

        }catch(err) {

            console.error(err)
            
            dispatch({
                type: 'NOTIFY',
                payload: {error : err.response.data.msg}
     
            })
        }
    }
}


export const register = (data) => async (dispatch) => {

   try {
          const res = await postDataApi('register' , data)

          console.log(res)

          dispatch({
            type: 'NOTIFY',
            payload: {success: res.response.data.msg}

           })

   }catch(err) {
        dispatch({
            type: 'NOTIFY',
            payload: {error : err.response.data.msg}

        })
   }
}


export const logout = () => async (dispatch) => {

    try {
            localStorage.removeItem("First Login")
             await postDataApi('logout')
            
    }catch(err) {
         dispatch({
             type: 'NOTIFY',
             payload: {error : err.response.data.msg}
 
         })
    }
 }