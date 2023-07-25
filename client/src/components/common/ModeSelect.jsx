import { IconButton } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const onSwithTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };
  return (
    <>
      <IconButton sx={{ color: 'inherit' }} onClick={onSwithTheme}>
        {mode === 'dark' && <DarkModeOutlinedIcon />}
        {mode === 'light' && <WbSunnyOutlinedIcon />}
      </IconButton>
    </>
  );
};

export default ModeSelect;