import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import GeticomServices from './pages/GeticomServices';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/sobre" component={About} />
                <Route exact path="/servicos" component={GeticomServices} />

                <Route path="*" component={NotFound} />
            </Switch>
            <ScrollToTop />
        </BrowserRouter>
    );
}

export default Routes;