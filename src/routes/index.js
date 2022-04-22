import Route from './Route'; 

import { Switch } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import ServicesPage from '../pages/ServicesPage';
import HighlightPage from '../pages/HighlightPage';
import Articles from '../pages/Articles';
import ArticlePage from '../pages/ArticlePage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Reset from '../pages/Reset';
import Admin from '../pages/Admin';
import DashboardHighlights from '../pages/DashboardHighlights';
import NewHighlight from '../pages/NewHighlight';
import DashboardArticles from '../pages/DashboardArticles';
import NewArticle from '../pages/NewArticle';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sobre" component={About} />
            <Route exact path="/servicos" component={ServicesPage} />

            <Route exact path="/destaques/:id/:title" component={HighlightPage}/>
            <Route exact path="/artigos" component={Articles} />
            <Route exact path="/artigos/:id/:title" component={ArticlePage} />

            <Route exact path="/admin/login" component={SignIn} />
            <Route exact path="/admin/reset" component={Reset} />
            <Route exact path="/admin" component={Admin} isPrivate />
            <Route exact path="/admin/register" component={SignUp} isPrivate />
            <Route exact path="/admin/highlights" component={DashboardHighlights} isPrivate />
            <Route exact path="/admin/compose/highlight" component={NewHighlight} isPrivate />
            <Route exact path="/admin/compose/highlight/:id" component={NewHighlight} isPrivate />
            <Route exact path="/admin/articles" component={DashboardArticles} isPrivate />
            <Route exact path="/admin/compose/article" component={NewArticle} isPrivate />
            <Route exact path="/admin/compose/article/:id" component={NewArticle} isPrivate />

            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default Routes;