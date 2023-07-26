import { useSelector } from 'react-redux';
import uiConfigs from '../../configs/ui.configs';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, useColorScheme } from '@mui/material';
import Logo from './Logo';
import menuConfigs from '../../configs/menu.configs';
import { themeModes } from '../../configs/theme.configs';
import { Link } from 'react-router-dom';
import ModeSelect from './ModeSelect';

const Sidebar = ({ open, toggleSidebar }) => {
  const { user } = useSelector(state => state.user);
  const { appState } = useSelector(state => state.appState);
  const { mode, setMode } = useColorScheme();
  const onSwithTheme = () => {
    setMode(mode === themeModes.dark ? themeModes.light : themeModes.dark);
  };

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width='100%' direction='row' justifyContent='center'>
          <Logo/>
        </Stack>
      </Toolbar>
      {/* menus */}
      <List sx={{ paddingX: '30px' }}>
        <Typography variant='h6' marginBottom='20px'>MENU</Typography>
        {
          menuConfigs.main.map((item, index) => (
            <ListItemButton key={index}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
              sx={{
                borderRadius: '10px',
                marginY: 1,
                backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform='uppercase'>{item.display}</Typography>
              } />
            </ListItemButton>
          ))
        }
        {user && (<>
          <Typography variant='h6' marginBottom='20px'>PERSONAL</Typography>
          {menuConfigs.user.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: '10px',
                marginY: 1,
                backgroundColor: appState.includes(item.state) ? 'primary.main' : 'unset'
              }}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={<Typography textTransform='uppercase'>
                {item.display}
              </Typography>} />
            </ListItemButton>
          ))}
        </>)}

        <Typography variant='h6' marginBottom='20px'>THEME</Typography>
        <ListItemButton
          onClick={onSwithTheme}
        >
          <ListItemIcon><ModeSelect/></ListItemIcon>
          <ListItemText
            disableTypography primary={
              <Typography textTransform='uppercase'>
                {mode === themeModes.dark ? 'dark mode' : 'light mode'}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        '& .MuiDrawer-paper':{
          width: sidebarWidth,
          boxSizing: 'border-box',
          borderRight: '0px'
        }
      }
      }
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;