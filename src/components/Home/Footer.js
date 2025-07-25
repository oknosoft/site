
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

export default function AppFooter({navigate}) {

  function onClick(evt) {
    const url = new URL(evt.target.href);
    evt.preventDefault();
    evt.stopPropagation();
    navigate(url.pathname);
  }

  return (
    <Box component="footer" sx={{overflow: 'auto'}}>
      <Box p={4}>
        <Typography variant="h6" gutterBottom>Быстрые ссылки</Typography>
        <Typography variant="subtitle1" component="div">
          <Grid container spacing={0}>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Ul>
                <Li><a href="/about" onClick={onClick}>О компании</a></Li>
                <Li><a href="https://github.com/oknosoft/metadata.js">Metadata.js</a></Li>
              </Ul>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Ul>
                <Li><a href="/articles/terms-of-use" onClick={onClick}>Пользовательское соглашение</a></Li>
                <Li><a href="/articles/privacy-policy" onClick={onClick}>Обработка персональных данных</a></Li>
              </Ul>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Box>
  );
}

