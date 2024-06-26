import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Main from "./pages/Main/Main";
import Navbar from "./components/UI/Navbar/Navbar";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Experts from "./pages/Experts/Experts";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Exit from "./pages/Exit/Exit";
import PVK from "./pages/PVK/PVK";
import Tests from "./pages/TestsList/Tests";
import LightReactionTest from "./pages/tests/LightReactionTest/LightReactionTest";
import SoundReactionTest from "./pages/tests/SoundReactionTest/SoundReactionTest";
import Results from "./pages/Results/Results";
import LightComplexReactionTest from "./pages/tests/LightComplexReactionTest/LightComplexReactionTest";
import VisualAdditionTest from "./pages/tests/VisualAdditionTest/VisualAdditionTest";
import SoundAdditionTest from "./pages/tests/SoundAdditionTest/SoundAdditionTest";
import MovingObjectTest from "./pages/tests/SimpleMovingObjectTest/SimpleMovingObjectTest";
import MovingObjectWithFollowing from "./pages/tests/MovingObjectWithFollowing/MovingObjectWithFollowing";
import AddProfession from "./pages/AddProfession/AddProfession";
import Profession from "./pages/Profession/Profession";
import ResultsOfPerson from "./pages/ResultsOfPerson/ResultsOfPerson";
import UpdateProfession from "./pages/UpdateProfession/UpdateProfession";
import MovingCircleTest from "./pages/tests/MovingCircleTest/MovingCircleTest";
import MovingMultipleCirclesTest from "./pages/tests/MovingMultipleCirclesTest/MovingMultipleCirclesTest";
import ResultsOfTests from "./pages/ResultsOfTests/ResultsOfTests"
import ResultsOfPersonTests from "./pages/ResultsOfPersonTests/ResultsOfPersonTests";
import AttentionAndConcentrationTest from "./pages/tests/AttentionAndConcentrationTest/AttentionAndConcentrationTest";
import MemoryTest from "./pages/tests/ShortTermMemoryTest/MemoryTest";
import EasyTest from "./pages/tests/ThinkingTest/EasyTest/EasyTest";
import HardTest from "./pages/tests/ThinkingTest/HardTest/HardTest";
import Pulse from "./pages/Pulse/Pulse"
import Footer from "./components/UI/Footer/Footer";
import InfoGraphSelection from "./pages/InfoGraphSelection/InfoGraphSelection";
import InfoGraphPage from "./pages/InfoGraphPage/InfoGraphPage";
function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    useEffect(()=>{
        if (user === null) {
            localStorage.clear()
            return;
        }
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])
    return (
        <BrowserRouter>
            <Navbar user={user}/>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Main user={user}/>}/>
                    <Route path="/exit" element={<Exit setUser={setUser}/>}/>
                    <Route path="/register" element={<Registration setUser={setUser}/>}/>
                    <Route path="/login" element={<Login setUser={setUser}/>}/>
                    <Route path="/professions/:id" element={<Profession/>}/>

                    <Route path="/*"  element={<PageNotFound/>}/>
                    {user ? // Authorized section
                        <>
                            <Route path="/updateProfession/:id?" element={<UpdateProfession user={user} />} />
                            <Route path="/addProfession" element={<AddProfession user={user}/>}/>
                            <Route path="/tests" element={<Tests/>}/>
                            <Route path="/experts"  element={<Experts/>}/>
                            <Route path="/PVK/:id?"  element={<PVK user={user}/>}/>
                            <Route path="/light-reaction-test"  element={<LightReactionTest user={user} />}/>
                            <Route path="/light-complex-reaction-test"  element={<LightComplexReactionTest user={user} />}/>
                            <Route path="/sound-reaction-test"  element={<SoundReactionTest user={user} />}/>
                            <Route path="/visual-addition-test"  element={<VisualAdditionTest user={user} />}/>
                            <Route path="/sound-addition-test"  element={<SoundAdditionTest user={user} />}/>
                            <Route path="/moving-circle-test"  element={<MovingCircleTest user={user}/>}/>
                            <Route path="/moving-multiple-circles-test"  element={<MovingMultipleCirclesTest user={user}/>}/>
                            <Route path="/moving-object-test"  element={<MovingObjectTest user={user} />}/>
                            <Route path="/moving-object-with-following"  element={<MovingObjectWithFollowing user={user} />}/>
                            <Route path="/attention-and-concentration-test"  element={<AttentionAndConcentrationTest user={user} />}/>
                            <Route path="/easy-thinking-test" element={<EasyTest user={user} />}/>
                            <Route path="/hard-thinking-test" element={<HardTest user={user} />}/>
                            <Route path="/memory-test" element={<MemoryTest user={user} />}/>

                            <Route path="/results"  element={<Results/>}/>
                            <Route path="/Pulse" element={<Pulse/>}/>
                            <Route path="/infograph" element={<InfoGraphSelection/>}/>
                            <Route path="/infograph/:id" element={<InfoGraphPage/>}/>
                            <Route path="/ResultsOfPerson" element={<ResultsOfPerson user={user}/>}/>
                            <Route path="/ResultsOfTests/:user_id" element={<ResultsOfTests user={user}/>}/>
                            <Route path="/ResultsOfPersonTests/:user_id/:test_id" element={<ResultsOfPersonTests user={user}/>}/>
                            <Route path="/admin/graph" element={<InfoGraphSelection/>}/>
                        </>
                        :
                        <>

                        </>
                    }
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
