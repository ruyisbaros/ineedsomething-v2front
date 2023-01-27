import React, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Routers } from './routes'
import { socketService } from '@services/sockets/socket.service'
import "./App.scss"
import Toast from '@components/toast/Toast'

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
  const { notifications } = useSelector(store => store)

  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position="top-right" toastList={notifications} autoDelete={true} />
      )}
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  )
}

export default App