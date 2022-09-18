import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DownloadIcon from '@mui/icons-material/CloudDownload';
import UploadIcon from '@mui/icons-material/CloudUpload';
import RemoveIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import {styled} from '@mui/material/styles';

const Typography = styled(MuiTypography)(() => ({
  flex: 1,
  whiteSpace: 'noWrap',
  overflow: 'hidden',
}));

function AttachmentsToolbar (props) {

  return (
    <Toolbar disableGutters>
      {!props.short && <IconButton title="Добавить" onClick={props.handleAdd}><UploadIcon/></IconButton>}
      <IconButton title="Получить" onClick={props.handleDownload}><DownloadIcon/></IconButton>
      {!props.short && <IconButton title="Удалить" onClick={props.handleDelete}><RemoveIcon/></IconButton>}

      <Typography variant="h6" color="inherit"> </Typography>

      {props.closeButton && props.handleClose && <IconButton title="Закрыть форму" onClick={props.handleClose}><CloseIcon/></IconButton>}

    </Toolbar>
  );
}

AttachmentsToolbar.propTypes = {
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func,
  handleDownload: PropTypes.func,
  handleClose: PropTypes.func,
  closeButton: PropTypes.bool,
  short: PropTypes.bool,
};

export default AttachmentsToolbar;

