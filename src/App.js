import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Allstudent from './Pages/Allstudent'
import Edit from './Pages/Edit'

const App = () => {

    const public_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path:'/register',
            component:<Register/>
        },
        {
            path:'/allstudent',
            component:<Allstudent/>
        },
        {
            path:'/edit/:id',
            component:<Edit/>
        }
        
    ]

    return (
        <>
            <Router>
                <Routes>
                    {public_routing?.map((routing) =>{
                        return(
                            <>
                                <Route path={routing.path} element={routing.component}/>
                            </>
                        )
                    })}
                </Routes>
            </Router>
        </>
    )
}

export default App
