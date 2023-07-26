import { cloneElement, useState } from 'react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useColorScheme, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { themeModes } from '../../configs/theme.configs';
import Logo from './Logo';
import ModeSelect from './ModeSelect';
import menuConfigs from '../../configs/menu.configs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';

const ScrollAppBar = ({ children, window }) => {
  const { mode } = useColorScheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

  return (
    cloneElement(children, {
      sx: {
        color: trigger ? 'text.primary' : mode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
        backgroundColor: trigger ? 'background.paper' : mode === themeModes.dark ? 'transparent' : 'background.paper'
      }
    })
  );
};

const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <ScrollAppBar>
        <AppBar sx={{ zIndex: 999 }} elevation={0}>
          <Toolbar sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {/* mobile */}
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton
                color='inherit'
                sx={{ mr: 2, display: { md: 'none' } }}
                onClick={toggleSidebar}
              >
                <MenuIcon/>
              </IconButton>
              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo/>
              </Box>
            </Stack>
            {/* pc */}
            <Box flexGrow={1} alignItems='center' sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ marginRight: '30px' }}>
                <Logo/>
              </Box>
              {
                menuConfigs.main.map((item, index) => (
                  <Button key={index}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
                      mr: 2
                    }}
                    variant={appState.includes(item.state) ? 'contained' : 'text'}
                  >
                    {item.display}
                  </Button>
                ))
              }
              <ModeSelect />
            </Box>
            {/* user menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && <Button
                variant="contained"
                // onClick={() => dispatch(setAuthModalOpen(true))}
              >
                sign in
              </Button>}
            </Stack>
            {
              user && <UserMenu />
            }
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;