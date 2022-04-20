import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest 
}){

    const { user, signed } = useContext(AuthContext);

    if (!signed && isPrivate) {
        return <Redirect to="/admin/login" />
    }

    if (signed && !isPrivate) {
        return <Redirect to="/admin" />
    }



    return(
        <Route 
            {...rest}
            render={ props => (

                <Component {...props} />
            ) }
        />
    );
}