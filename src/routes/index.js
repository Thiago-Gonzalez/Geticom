import Route from './Route'; 
//import custom route (RouteWrapper)
import { Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import ServicesPage from '../pages/ServicesPage';
import HighlightPage from '../pages/HighlightPage';
import Articles from '../pages/Articles';
import ArticlePage from '../pages/ArticlePage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sobre" component={About} />
            <Route exact path="/servicos" component={ServicesPage} />

            <Route exact path="/destaques/:id/:title" component={HighlightPage}/>
            <Route exact path="/artigos" component={Articles} />
            <Route exact path="/artigos/:id/:title" component={ArticlePage} />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;