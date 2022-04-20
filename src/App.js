import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ArticlesProvider from './contexts/articles';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/auth';

import 'react-toastify/dist/ReactToastify.css';
import HighlightsProvider from './contexts/highlights';

function App() {

  return (
    <AuthProvider>
      <ArticlesProvider>
        <HighlightsProvider>
          <BrowserRouter>
            <ToastContainer 
              autoClose={3000}
            />
            <Routes />
            <ScrollToTop />
          </BrowserRouter>
        </HighlightsProvider>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;
