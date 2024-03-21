import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createExcerpt } from "../helpers/excerpt";

export const RequestList = () => {
    const navigate = useNavigate();
    const [requestList, setRequestList] = useState([]);

    const getRequestList = async () => {
        try {
            const response = await fetch("https://localhost:7213/api/Request");
            const data = await response.json();
            setRequestList(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRequestList();
    }, []);
    return (
        <div className="reqListComp-wrapper">
            <h2 className="text-center">Request List</h2>
            <div className="reqList-container">      
                {
                    requestList.length > 0 ? 
                    requestList.map((req) => {
                        return (
                            <div onClick={() => navigate(`/request/view/${req?.requestId}`)}  key={req?.requestId}
                                className={`reqList-item ${req?.requestPriority}-priority`}>
                                <h3>{req?.requestTitle}</h3>
                                <p className="req-item-desc">
                                    {createExcerpt(req?.requestDescription, 20)}
                                </p>
                            </div>
                        )
                    }) : <h2 className="text-center">No Data Found!</h2>
                }   
            </div>
        </div>
    )
}

export default RequestList;