import { Routes, Route } from 'react-router-dom'

// Keep all routing localized here for PAGES
import Home from '../../pages/Home'
import NowPlaying from '../../pages/NowPlaying'
import Popular from '../../pages/Popular'
import Theater from '../../pages/Theater'
import Upcoming from '../../pages/Upcoming'
import Login from '../../pages/Login'

export default function MyRouter() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path='/nowplaying' element={<NowPlaying />}></Route>
                <Route exact path='/popular' element={<Popular />}></Route>
                <Route exact path='/theater' element={<Theater />}></Route>
                <Route exact path='/upcoming' element={<Upcoming />}></Route>
                <Route exact path='/login' element={<Login />}></Route>
            </Routes>
        </>
     
    )
}