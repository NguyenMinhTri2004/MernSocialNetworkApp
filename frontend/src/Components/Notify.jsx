import React  from 'react'
import {useSelector} from 'react-redux'
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notify = ({dispatch}) => {
  
   const notify = useSelector(state => state.alertReducer) 

    notify.success && toast.success(notify.success)

    notify.error &&  toast.error(notify.error)

   
  return (
    <div>
        
              {
                notify.loading ? <Loading />
                :
                <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
              }

        
    </div>
  )
}

export default Notify