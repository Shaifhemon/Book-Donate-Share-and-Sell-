import { createContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'

import Header from './components/Header'
import Welcome from './components/Welcome'
import DonateList from './components/DonateList'
import AddDonate from './components/AddDonate'
import EditDonate from './components/EditDonate'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import RequestList from './components/RequestList'
import AddRequest from './components/AddRequest'
import EditRequest from './components/EditRequest'
import SellList from './components/SellList'
import AddSell from './components/AddSell'
import EditSell from './components/EditSell'

export const UserContext = createContext()

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token == null){
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenResponse = await axios.post(
        '/api/users/tokenIsValid', 
        null, 
        {headers: {"auth-token": token}}
      )

      console.log(tokenResponse.data)
      if(tokenResponse.data){
        const userResponse = await axios.get('/api/users/profile',
          {headers: {'auth-token': token}}
        )
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Header />
        <Container>        
            <Route path='/' exact component={Welcome} />
            <Route path='/donatelist' component={DonateList} />
            <Route path='/addDonate' component={AddDonate} />
            <Route path='/donate/:id' component={EditDonate} />
            <Route path='/requestlist' component={RequestList} />
            <Route path='/addRequest' component={AddRequest} />
            <Route path='/request/:id' component={EditRequest} />
            <Route path='/selllist' component={SellList} />
            <Route path='/addsell' component={AddSell} />
            <Route path='/sell/:id' component={EditSell} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />        
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
