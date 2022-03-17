import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ServicesPage from './pages/ServicesPage';
import HighlightPage from './pages/HighlightPage';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/sobre" component={About} />
                <Route exact path="/servicos" component={ServicesPage} />
                <Route exact path="/destaques/:id/:title" component={HighlightPage}/>

                <Route path="*" component={NotFound} />
            </Switch>
            <ScrollToTop />
        </BrowserRouter>
    );
}

export default Routes;