
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Ul = styled('ul')(({theme}) => ({
  margin: 0,
  paddingLeft: 0,
  listStyle: 'none',
}));

const Li = styled('li')(({theme}) => ({
  paddingTop: theme.spacing() / 2,
  paddingBottom: theme.spacing() / 2,
}));

function AppFooter(props) {
  const {handleNavigate} = props;

  function onClick(evt) {
    const url = new URL(evt.target.href);
    evt.preventDefault();
    evt.stopPropagation();
    handleNavigate(url.pathname);
  }

  return (
    <Box component="footer" sx={{overflow: 'auto'}}>
      <Box p={4}>
        <Typography variant="h6" gutterBottom>Быстрые ссылки</Typography>
        <Typography variant="subtitle1" component="div">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Ul>
                <Li><a href="/about" onClick={onClick}>О компании</a></Li>
                <Li><a href="https://github.com/oknosoft/metadata.js">Metadata.js</a></Li>
              </Ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Ul>
                <Li><a href="/terms_of_use" onClick={onClick}>Пользовательское соглашение</a></Li>
                <Li><a href="/privacy_policy" onClick={onClick}>Обработка персональных данных</a></Li>
              </Ul>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Box>
  );
}

AppFooter.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
};

export default AppFooter;
