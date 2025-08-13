import * as React from 'react';
import Typography from '@mui/material/Typography';
import {description as def} from './menu';

let description = def;
for(const meta of document.head.children) {
  if(meta.attributes.name?.value?.includes('description') && meta.attributes.content?.value) {
    description = meta.attributes.content.value;
    break;
  }
}
const title = document.title || description;

export const initialTitle = {
  description,
  title,
  appTitle: <Typography variant="h6" noWrap component="div">{title}</Typography>,
  setTitle() {
  },
};

export const TitleContext = React.createContext(initialTitle);
export const useTitleContext = () => React.useContext(TitleContext);
