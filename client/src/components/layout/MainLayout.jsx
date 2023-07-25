import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../common/GlobalLoading';
import Footer from '../common/Footer';
import ModeSelect from '../common/ModeSelect';
const MainLayout = () => {
  return (
    <>
      {/* Global loading */}
      <GlobalLoading />

      {/* login modal */}
      <Box display='flex' minHeight='100vh'>
        {/* Header */}
        <ModeSelect />
        {/* main */}
        <Box
          component='main'
          flexGrow={1}
          overflow='hidden'
          minHeight='100vh'
        >
          <Outlet />
        </Box>
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;