import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const RequestView = () => {

    const {reqId} = useParams();
    const navigate = useNavigate();
    const [ requestData, setRequestData ] = useState(null);

    const getRequest = async() => {
        try{
            const response = await fetch(`https://localhost:7213/api/Request/${reqId}`);
            const data = await response.json();
            setRequestData(data);
        }catch(error){
            console.log(error);
        }
    }

    const deleteRequest = async() => {
        try{
            const response = await fetch(`https://localhost:7213/api/Request/${reqId}`, {
                method: "DELETE"
            });
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getRequest();
    }, []);

	return (
        <div className="reqViewComp-wrapper">
            <h2 className="text-center">View Request</h2>
            <div className="reqView-container">      
                <div className="reqView-item">
                    <div className='reqView-item-header-section'>
                        <h3>{requestData ? requestData?.requestTitle : ''}</h3>
                        <div className='reqView-item-header-options'>
                            <button onClick={() => navigate(`/request/edit/${reqId}`)} className='btn btn-primary'>Edit</button>
                            <button onClick={deleteRequest} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>

                    <div className='reqView-desc-container'>
                        <p className="req-item-desc">
                            { requestData ? requestData?.requestDescription : '' }
                        </p>
                    </div>
                </div>
            </div>
		</div>
	)
}

export default RequestView;