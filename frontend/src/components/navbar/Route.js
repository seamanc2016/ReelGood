import { Routes, Route } from 'react-router-dom'

// Keep all routing localized here for PAGES
import Home from '../../pages/Home'
import NowPlaying from '../../pages/NowPlaying'
import Popular from '../../pages/Popular'
import Theater from '../../pages/Theater'
import Upcoming from '../../pages/Upcoming'
import Login from '../../pages/Login'
import Register from '../userauth/Register'


export default function MyRouter() {
    return (
        <>
            <Routes> 
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path='/Nowplaying' element={<NowPlaying />}></Route>
                <Route exact path='/Popular' element={<Popular />}></Route>
                <Route exact path='/Theater' element={<Theater />}></Route>
                <Route exact path='/Upcoming' element={<Upcoming />}></Route>
                <Route exact path='/Login' element={<Login />}></Route>
                <Route exact path='/Register' element={<Register />}></Route>
            </Routes>
        </>
     
    )
}