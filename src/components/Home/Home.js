
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import Helmet from 'react-helmet';
import AppFooter from './Footer';
import Flask from '../../styles/icons/Flask';
import Accessibility from '@mui/icons-material/AccessibilityNew';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
//import Timer from '@mui/icons-material/Timer';
//import InfiniteArticles from '../Articles/MUiArticles';
import {fromQuery} from '../Articles/queryString';

import {description} from '../App/menu';

import styles from './styles';

const ltitle = 'Окнософт';

class PageHome extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.tags = [];
    this.tagList = [];
    this.tagFilter = [];
    this.classes = styles();
    this.shouldComponentUpdate(props);
  }

  shouldComponentUpdate({complete_loaded, title, handleIfaceState}) {
    const {tagList, tagFilter} = this;
    if(!tagFilter.length && complete_loaded) {
      tagFilter.push($p.cat.tags_category.predefined('news'));
      $p.cat.tags.find_rows({category: {in: tagFilter}}, (tag) => tagList.push(tag));
    }
    if(title != ltitle) {
      handleIfaceState({
        component: '',
        name: 'title',
        value: ltitle,
      });
      return false;
    }
    return true;
  }

  render() {
    const {classes, props:{handleNavigate, match, location}} = this;
    const {tags, tagList, tagFilter} = this;
    const prm = fromQuery();

    return (
      <Box sx={classes.root}>

        <Helmet title={ltitle}>
          <meta name="description" content={description} />
          <meta property="og:title" content={ltitle} />
          <meta property="og:description" content={description} />
        </Helmet>

        <Grid container sx={classes.hero} spacing={8}>

          <Grid item sm={12} lg={5}>
            <Grid container alignItems="stretch" direction="column" justify="space-around">

              <Grid item>
                <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => handleNavigate('/articles/products')}>
                  <Hidden smDown><Grid item xs={1}/></Hidden>
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
                <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => handleNavigate('/contents/')}>
                  <Hidden smDown><Grid item xs={1}/></Hidden>
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
                <Grid container sx={classes.menu} spacing={2} wrap="nowrap" onClick={() => handleNavigate('/flowcon/diagram')}>
                  <Hidden smDown><Grid item xs={1}/></Hidden>
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

          <Grid item sm={12} lg={7}>
            <Grid container alignItems="stretch" direction="column" justify="flex-start" sx={classes.news}>
              <Grid item>
                <Grid container spacing={2} wrap="nowrap">
                  <Hidden smDown><Grid item xs={1}/></Hidden>
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
                          handleNavigate={handleNavigate}
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

        <AppFooter handleNavigate={handleNavigate}/>
      </Box>
    );
  }
}

PageHome.propTypes = {
  title: PropTypes.string.isRequired,
  handleNavigate: PropTypes.func,
  handleIfaceState: PropTypes.func,
  complete_loaded: PropTypes.bool,
};

export default PageHome;
