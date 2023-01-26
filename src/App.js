import React, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom"
import { Routers } from './routes'
import { useDispatch } from 'react-redux'
import "./App.scss"
import { userLoggedSuccess } from '@redux/currentUserSlicer'
import { currentUser } from '@services/api/user.service'
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
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App