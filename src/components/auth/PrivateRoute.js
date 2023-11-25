import { useLocation, Navigate   } from 'react-router-dom'
import { isAuthenticated } from './auth-helper'

function PrivateRoute({ children }){

    let location = useLocation();

    if(!isAuthenticated()){
        return <Navigate to="/auth/signin" state={{ from: location.pathname}} />
    }

    return children
}

export default PrivateRoute