import ModeSelect from './components/common/ModeSelect';
import { ToastContainer } from 'react-toastify';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './configs/theme.configs.js';
import CssBaseline from '@mui/material/CssBaseline';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
  return (
    <>
      <CssVarsProvider theme={theme}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme={theme}
        />
        <CssBaseline/>
        <div>
          <ModeSelect/>
        </div>
      </CssVarsProvider>
    </>
  );
};

export default App;