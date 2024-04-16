import './App.css';
import {BrowserRouter, matchRoutes, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Main from "./pages/Main";
import Navbar from "./components/UI/Navbar/Navbar";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Experts from "./pages/Experts";
import PageNotFound from "./pages/PageNotFound";
import Exit from "./pages/Exit";
import PVK from "./pages/PVK";
import Tests from "./pages/Tests";
import LightReactionTest from "./pages/tests/LightReactionTest/LightReactionTest";
import SoundReactionTest from "./pages/tests/SoundReactionTest/SoundReactionTest";
import Results from "./pages/Results";
import LightComplexReactionTest from "./pages/tests/LightComplexReactionTest/LightComplexReactionTest";
import VisualAdditionTest from "./pages/tests/VisualAdditionTest/VisualAdditionTest";
import SoundAdditionTest from "./pages/tests/SoundAdditionTest/SoundAdditionTest";
import MovingObjectTest from "./pages/tests/MovingObjectTest/MovingObjectTest";
import UserTestsResults from "./pages/adminPanel/UserTestsResults/UserTestsResults";
import AddProfession from "./pages/AddProfession";
import Profession from "./pages/Profession";
import ConcreteResults from "./pages/ConcreteResults";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    useEffect(()=>{
        if (user === null) {
            localStorage.clear()
            return;
        }
        console.log(JSON.stringify(user))
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    useEffect(()=>{
        console.log(user)
    }, [user])
    return (
        <BrowserRouter>
            <Navbar user={user}/>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/exit" element={<Exit setUser={setUser}/>}/>
                    <Route path="/register" element={<Registration setUser={setUser}/>}/>
                    <Route path="/login" element={<Login setUser={setUser}/>}/>

                    <Route path="/*"  element={<PageNotFound/>}/>

                    {user ?
                        <>
                            <Route path="/addProfession" element={<AddProfession/>}/>
                            <Route path="/professions/:id" element={<Profession/>}/>
                            <Route path="/professions/:id/pvk" element={<PVK/>}/>
                            <Route path="/results/:test_id" element={<ConcreteResults/>}/>
                            <Route path="/tests" element={<Tests/>}/>
                            <Route path="/experts"  element={<Experts/>}/>
                            <Route path="/light-reaction-test"  element={<LightReactionTest user={user}/>}/>
                            <Route path="/light-complex-reaction-test"  element={<LightComplexReactionTest/>}/>
                            <Route path="/sound-reaction-test"  element={<SoundReactionTest/>}/>
                            <Route path="/visual-addition-test"  element={<VisualAdditionTest/>}/>
                            <Route path="/sound-addition-test"  element={<SoundAdditionTest/>}/>
                            <Route path="/moving-object-test"  element={<MovingObjectTest/>}/>
                            <Route path="/results"  element={<Results/>}/>

                            <Route path="/admin/user-tests-results"  element={<UserTestsResults/>}/>
                        </>
                        :
                        <>

                        </>
                    }
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
