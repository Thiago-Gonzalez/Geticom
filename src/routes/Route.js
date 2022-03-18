import { Route } from "react-router-dom";

export default function RouteWrapper({
    component: Component,
    isPrivate, //private route
    ...rest //spread operator: rest of default config
}){


    return(
        <Route 
            {...rest}
            render={ props => (
                // render component and its props
                <Component {...props} />
            ) }
        />
    );
}