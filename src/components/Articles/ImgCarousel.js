import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'metadata-ui/Carousel/Carousel';

export default function ImgCarousel({imgs}) {
  const items = imgs.split(',');
  return <div style={{maxWidth: '70%'}}>
    <Carousel navButtonsAlwaysVisible>
      {items.map((src) => (
        <ImageListItem key={src}>
          <img src={src} loading="lazy"/>
        </ImageListItem>
      ))}
    </Carousel>
  </div>;
}
