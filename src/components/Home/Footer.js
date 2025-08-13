
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router';

const Ul = styled('ul')(({theme}) => ({
  margin: 0,
  paddingLeft: 0,
  listStyle: 'none',
}));

const Li = styled('li')(({theme}) => ({
  paddingTop: theme.spacing() / 2,
  paddingBottom: theme.spacing() / 2,
}));

const typographySx = {fontSize: 'small'};

export default function AppFooter() {

  const navigate = useNavigate();
  function onClick(evt) {
    const url = new URL(evt.target.href);
    evt.preventDefault();
    evt.stopPropagation();
    navigate(url.pathname);
  }

  return (
    <Box component="footer" sx={{overflow: 'auto'}}>
      <Box p={4}>
        <Typography variant="h6" gutterBottom sx={typographySx}>Быстрые ссылки</Typography>
        <Typography variant="subtitle1" component="div" sx={typographySx}>
          <Grid container spacing={0}>
            <Grid item size={{ xs: 12, sm: 3 }}>
              <Ul>
                <Li><a href="/about" onClick={onClick}>О компании</a></Li>
                <Li><a href="/products/metadata" onClick={onClick}>Metadata.js</a></Li>
                <Li><a href="/products/mirror-workshop" onClick={onClick}>Зеркальная мастерская</a></Li>
              </Ul>
            </Grid>
            <Grid item size={{ xs: 12, sm: 3 }}>
              <Ul>
                <Li><a href="/products/zd" onClick={onClick}>Заказ дилера</a></Li>
                <Li><a href="/products/cutting2d" onClick={onClick}>Раскрой стекла</a></Li>
                <Li><a href="/products/cutting" onClick={onClick}>Раскрой профиля</a></Li>
              </Ul>
            </Grid>
            <Grid item size={{ xs: 12, sm: 4 }}>
              <Ul>
                <Li><a href="/articles/terms-of-use" onClick={onClick}>Пользовательское соглашение</a></Li>
                <Li><a href="/articles/privacy-policy" onClick={onClick}>Обработка персональных данных</a></Li>
                <Li><a href="/products/price" onClick={onClick}>Цены</a></Li>
              </Ul>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Box>
  );
}

