import {createTheme} from '@mui/material';
import primary from '@mui/material/colors/blueGrey';

const theme = createTheme({

  // Purple and green play nicely together.
  palette: {
    primary,
  },

  components: {
    // Name of the component️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application
      },
    },
  },

});

export default theme;

