import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ArticlesProvider from './contexts/articles';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/auth';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <ToastContainer 
            autoClose={3000}
          />
          <Routes />
          <ScrollToTop />
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;
