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
import MovingObjectTest from "./pages/tests/SimpleMovingObjectTest/MovingObjectTest";
import MovingObjectWithFollowing from "./pages/tests/MovingObjectWithFollowing/MovingObjectWithFollowing";
import UserTestsResults from "./pages/adminPanel/UserTestsResults/UserTestsResults";
import AddProfession from "./pages/AddProfession/AddProfession";
import Profession from "./pages/Profession/Profession";
import ResultsOfPerson from "./pages/ResultsOfPerson/ResultsOfPerson";
import InfoGraphPage from "./pages/InfoGraph/InfoGraphPage";
import GraphPage from "./pages/Graph/GraphPage";
import UpdateProfession from "./pages/UpdateProfession/UpdateProfession";
import MovingCircleTest from "./pages/tests/MovingCircleTest/MovingCircleTest";
import MovingMultipleCirclesTest from "./pages/tests/MovingMultipleCirclesTest/MovingMultipleCirclesTest";
import ResultsOfTests from "./pages/ResultsOfTests/ResultsOfTests"
import ResultsOfPersonTests from "./pages/ResultsOfPersonTests/ResultsOfPersonTests";
import AttentionAndConcentrationTest from "./pages/tests/AttentionAndConcentrationTest/AttentionAndConcentrationTest";
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
                            <Route path="/professions/:id/pvk" element={<PVK/>}/>
                            <Route path="/tests" element={<Tests/>}/>
                            <Route path="/experts"  element={<Experts/>}/>
                            {/*<Route path="/pvk"  element={<PVK/>}/>*/}

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

                            <Route path="/results"  element={<Results/>}/>
                            <Route path="/ResultsOfPerson" element={<ResultsOfPerson user={user}/>}/>
                            <Route path="/ResultsOfTests" element={<ResultsOfTests user={user}/>}/>
                            <Route path="/ResultsOfPersonTests/:test_id" element={<ResultsOfPersonTests user={user}/>}/>
                            <Route path="/admin/user-tests-results"  element={<UserTestsResults/>}/>
                            <Route path="/admin/graph" element={<InfoGraphPage/>}/>
                            <Route path="/admin/graph/:id" element={<GraphPage/>}/>
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
