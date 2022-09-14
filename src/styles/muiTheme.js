import {createTheme} from '@mui/material';
import primary from '@mui/material/colors/blueGrey';

const theme = createTheme({

  // Purple and green play nicely together.
  palette: {
    primary,
  },

  mixins: {
    toolbar: {
      minHeight: 50,
    }
  },

  typography: {
    h4: {
      fontSize: '1.8rem',
      '@media (min-width:1200px)': {
        fontSize: '2rem',
      },
    }
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

