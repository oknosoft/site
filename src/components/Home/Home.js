
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Helmet from 'react-helmet';
import {useNavigate} from 'react-router';
import AppFooter from './Footer';
import Flask from '../../styles/icons/Flask';
import Accessibility from '@mui/icons-material/AccessibilityNew';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
//import Timer from '@mui/icons-material/Timer';
//import InfiniteArticles from '../Articles/MUiArticles';
import {fromQuery} from '../Articles/queryString';
import {useLoadingContext} from '../Metadata';
import {useTitleContext} from '../App';

import {description} from '../App/menu';

import styles from './styles';
const classes = styles();

const ltitle = {title: 'Окнософт', appTitle: <Typography variant="h6" noWrap>Окнософт</Typography>};

export default function PageHome() {
  const {setTitle} = useTitleContext();
  const {ifaceState: {complete_loaded}} = useLoadingContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTitle(ltitle);
    // const {tagList, tagFilter} = this;
    // if(!tagFilter.length && complete_loaded) {
    //   tagFilter.push($p.cat.tags_category.predefined('news'));
    //   $p.cat.tags.find_rows({category: {in: tagFilter}}, (tag) => tagList.push(tag));
    // }
  }, []);

  return <Box sx={classes.root}>

    <Helmet title={ltitle.title}>
      <meta name="description" content={description} />
      <meta property="og:title" content={ltitle.title} />
      <meta property="og:description" content={description} />
    </Helmet>

    <Grid container sx={classes.hero} spacing={8}>

      <Grid item size={{ sm: 12, lg: 5 }}>
        <Grid container alignItems="stretch" direction="column" justify="space-around">

          <Grid item>
            <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => navigate('/articles/products')}>
              <Grid size={{ xs: 0, sm: 1 }}/>
              <Grid item>
                <ShoppingBasket alt="Продукты" sx={classes.logo} color="disabled"/>
              </Grid>
              <Grid item sx={classes.content}>
                <Typography variant="h5" component="h2">Продукты</Typography>
                <Typography color="textSecondary">Что у нас можно купить</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => navigate('/contents/')}>
              <Grid size={{ xs: 0, sm: 1 }}/>
              <Grid item>
                <LibraryBooks alt="Статьи" sx={classes.logo} color="disabled"/>
              </Grid>
              <Grid item sx={classes.content}>
                <Typography variant="h5" component="h2">Статьи</Typography>
                <Typography color="textSecondary">
                  Методические материалы и технический блог
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => navigate('/flowcon/diagram')}>
              <Grid size={{ xs: 0, sm: 1 }}/>
              <Grid item>
                <Flask alt="Flowcon Logo" sx={classes.logo} color="disabled"/>
              </Grid>
              <Grid item sx={classes.content}>
                <Typography variant="h5" component="h2">Документация</Typography>
                <Typography color="textSecondary">
                  Описание API наших библиотек
                </Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>

      <Grid item size={{ sm: 12, lg: 7 }}>
        <Grid container alignItems="stretch" direction="column" justify="flex-start" sx={classes.news}>
          <Grid item>
            <Grid container spacing={2} wrap="nowrap">
              <Grid size={{ xs: 0, sm: 1 }}/>
              <Grid item>
                <Typography variant="h5" component="h3">Новости</Typography>
                {/*
                      tagFilter.length ?
                        <InfiniteArticles
                          news
                          tags={tags}
                          tagList={tagList}
                          page={prm.page}
                          match={match}
                          location={location}
                          pageSize={7}
                          navigate={navigate}
                        />
                        :
                        <Typography>Загрузка...</Typography>
                    */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <AppFooter navigate={navigate}/>
  </Box>;
}
