import React, { useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom"
import { Routers } from './routes'
import { socketService } from '@services/sockets/socket.service'
import "./App.scss"


const App = () => {

  /* const dispatch = useDispatch()

  useEffect(() => {
    const syncCurrentUser = async () => {
      const res = await currentUser()
      console.log(res.data);
      dispatch(userLoggedSuccess({ currentUser: res.data.user, token: res.data.token }))
    }
    syncCurrentUser()
  }, [dispatch])
 */


  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  )
}

export default App