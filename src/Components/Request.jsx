import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import LoaderScreen from "../utils/loaderScreen";

export const Request = () => {

    const navigate = useNavigate();
    const {reqId} = useParams();
    const {pathname } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [currentFormState, setCurrentFormState] = useState('Add');
    const [requestData, setRequestData] = useState({
        requestTitle: "",
        requestDescription: "",
        requestStatus: "Pending",
        requestPriority: "Low",
        requestCreated: "",
        requestUpdated: ""
    });

    const handleChange = (e) => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    const getRequest = async() => {
        try{
            const response = await fetch(`https://localhost:7213/api/Request/${reqId}`);
            const data = await response.json();
            const {requestTitle, requestDescription, requestStatus, requestPriority, requestCreated, requestUpdated} = data;
            setRequestData({...requestData,
                requestTitle,
                requestDescription,
                requestStatus,
                requestPriority,
                requestCreated,
                requestUpdated,
            });
        }catch(error){
            console.log(error);
        }
    }

    const addRequestHandler = async() => {
        const payload = {...requestData, requestCreated: new Date().toISOString(), requestUpdated: new Date().toISOString()};
       
        const response = await fetch("https://localhost:7213/api/Request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data;
    }

    const updateRequestHandler = async() => {
        const payload = {...requestData, requestId: reqId, requestUpdated: new Date().toISOString()};
        
        const response = await fetch(`https://localhost:7213/api/Request/${reqId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data;
    }

    const formSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            currentFormState === 'Add' ? await addRequestHandler() : await updateRequestHandler();
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (pathname.includes('edit')) {
            setCurrentFormState('Edit');
            getRequest();
        } else {
            setCurrentFormState('Add');
            setRequestData({
                requestTitle: "",
                requestDescription: "",
                requestStatus: "Pending",
                requestPriority: "Low",
                requestCreated: "",
                requestUpdated: ""
            });
        }
    }, [reqId]);

    return ( isLoading ? <LoaderScreen /> : (
        <div className="reqComp-wrapper">
            <div className="reqcard-wrapper">
                <h2 className="text-center">{currentFormState === 'Add' ? 'Add Request' : 'Edit Request'}</h2>
                <form onSubmit={formSubmitHandler} className="request-form-container">
                    <div className="form-group">
                        <label htmlFor="request-title">Title</label>
                        <input type="text" name="requestTitle" className="form-control" value={requestData?.requestTitle} onChange={handleChange}
                            id="request-title" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-description">Description</label>
                        <textarea className="form-control" name="requestDescription" value={requestData?.requestDescription} onChange={handleChange}
                            id="request-description" rows="3" placeholder="Description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="request-status">Status</label>
                        <select value={requestData?.requestStatus} onChange={handleChange} 
                            name="requestStatus" id="request-status" className="form-control">
                            <option value={''}>Select Status</option>
                            <option value={'Pending'}>Pending</option>
                            <option value={'Approved'}>Approved</option>
                            <option value={'Rejected'}>Rejected</option>
                        </select>
                    </div>
                    <div className="form-check-label">
                        <label>Priority</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="requestPriority" value={'Low'} onChange={handleChange} checked={requestData?.requestPriority === 'Low'} 
                            className="form-control" id="request-priority" />
                        <label htmlFor="request-priority">Low</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="requestPriority" value={'Medium'} onChange={handleChange} checked={requestData?.requestPriority === 'Medium'} 
                            className="form-control" id="request-priority" />
                        <label htmlFor="request-priority">Medium</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="requestPriority" value={'High'} onChange={handleChange} checked={requestData?.requestPriority === 'High'} 
                            className="form-control" id="request-priority" />
                        <label htmlFor="request-priority">High</label>
                    </div>
                    <div className="form-btn-group">
                        <button type="submit" className="btn btn-primary">{currentFormState === 'Add' ? 'Submit': 'Update'}</button>
                    </div>
                </form>
            </div>
        </div>
    ))
}

export default Request;