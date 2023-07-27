import { ToastContainer } from 'react-toastify';
import theme from './configs/theme.configs.js';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import PageWrapper from './components/common/PageWrapper';
import routes from './routes/routes';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useColorScheme } from '@mui/material';


const App = () => {
  const { mode } = useColorScheme();
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={theme}
        style={{ color: `${mode === 'dark' ? '#fff' : '#333'}` }}
      />
      <CssBaseline/>

      {/* app route */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;