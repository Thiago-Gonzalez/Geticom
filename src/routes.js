import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;