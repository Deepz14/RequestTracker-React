import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Request from './Request';
import RequestList from "./RequestList";
import RequestView from './RequestView';

export const Body = () => {
    return (
        <>
            <Router>
                <Navbar />
                <div className="main-container">
                    <Routes>
                        <Route exact path="/" element={<RequestList />}></Route>
                        <Route element={<Request />} path='request/add/'></Route>
                        <Route element={<RequestView />} path='request/view/:reqId'></Route>
                        <Route element={<Request />} path='request/edit/:reqId'></Route>
                    </Routes>
                </div> 
            </Router>
        </>
    )
}

export default Body;