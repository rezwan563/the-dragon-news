import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    if(loading){
        return <div>
            <p style={{fontSize: '24px', textAlign: 'center'}}>Please wait..</p>
        </div>
    }
    
    if (user) {
        return children;
    }
    return <Navigate state={{from: location}} to='/login'></Navigate>


};

export default PrivateRoute;