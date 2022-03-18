import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ArticlesProvider from './contexts/articles';
import Routes from './routes';

function App() {
  return (
    <ArticlesProvider>
      <BrowserRouter>
        <Routes />
        <ScrollToTop />
      </BrowserRouter>
    </ArticlesProvider>
  );
}

export default App;
