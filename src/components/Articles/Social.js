/**
 * Кнопки социальных сетей
 * @module Social
 *
 * Created by Evgeniy Malyarov on 19.04.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';

// https://github.com/nygardk/react-share/blob/master/demo/Demo.jsx
import {
  // FacebookShareCount,
  // GooglePlusShareCount,
  // VKShareCount,
  // OKShareCount,

  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  MailruShareButton,
  EmailShareButton,


  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  MailruIcon,
  EmailIcon,
} from 'react-share';

const share = {
  cursor: 'pointer',
  '&:hover:not(:active)': {
    opacity: 0.75
  },
  display: 'inline-block',
  marginTop: 1,
  marginRight: 1
};

function ShareButton({Component, ...props}) {
  return <Box sx={share}><Component {...props}/></Box>;
}

function Social(props) {

  const {title} = props;
  const {href} = location;
  const theme = useTheme();

  return (
    <Box mt={theme.spacing(2)}>
      <Typography variant="h6" component="h3" color="primary">Поделиться ссылкой:</Typography>
      <ShareButton
        Component={WhatsappShareButton}
        url={href}
        title={title}
        separator=":: ">
        <WhatsappIcon size={32} round />
      </ShareButton>
      <ShareButton
        Component={TelegramShareButton}
        url={href}
        title={title}>
        <TelegramIcon size={32} round />
      </ShareButton>
      <ShareButton
        Component={VKShareButton}
        url={href}
        windowWidth={660}
        windowHeight={460}>
        <VKIcon size={32} round />
      </ShareButton>
      <ShareButton
        Component={OKShareButton}
        url={href}
        windowWidth={660}
        windowHeight={460}>
        <OKIcon size={32} round />
      </ShareButton>
      <ShareButton
        Component={MailruShareButton}
        url={href}
        title={title}>
        <MailruIcon size={32} round />
      </ShareButton>
      <ShareButton
        Component={EmailShareButton}
        url={href}
        subject={title}
        body={href}>
        <EmailIcon size={32} round />
      </ShareButton>
    </Box>
  );
}

Social.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Social;
