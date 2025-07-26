import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ImgList({imgs}) {

  const items = imgs.split(',');
  return (
    <ImageList sx={{display: 'flex'}} gap={16} cols={4} rowHeight={150}>
      {items.map((src) => (
        <ImageListItem key={src}>
          <img src={src} style={{maxWidth: 220, cursor: 'pointer'}} loading="lazy"/>
        </ImageListItem>
      ))}
    </ImageList>
  );
}
