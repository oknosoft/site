import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import {useTitleContext} from '../App';
import Loading from '../App/Loading';

const cmap = {
  files: 'file',
  articles: 'article',
}
const tmap = {
  files: {title: 'Файлы', appTitle: <Typography variant="h6" noWrap>Файлы</Typography>},
  articles: {title: 'Статьи', appTitle: <Typography variant="h6" noWrap>Статьи</Typography>},
}

export default function Articles() {

  const {setTitle} = useTitleContext();
  const location = useLocation();
  const category = cmap[location.pathname.substring(1)];
  const [docs, setDocs] = React.useState([]);
  const navigate = useNavigate();
  function onClick(evt) {
    const url = new URL(evt.target.href);
    evt.preventDefault();
    evt.stopPropagation();
    navigate(url.pathname);
  }

  React.useEffect(() => {
    const {adapters: {pouch}, utils} = $p;
    pouch.remote.ram.find({
      selector: {
        class_name: "cat.articles",
        category,
        published: true
      },
      fields: ["_id", "id", "aliases", "name", "descr", "date", "author", "sorting_field"],
    })
      .then(res => {
        res.docs.forEach(v => {
          if(!v.sorting_field) {
            v.sorting_field = 0;
          }
        });
        setDocs(res.docs.sort(utils.sort('sorting_field', 'desc')));
      });

    setTitle(tmap[location.pathname.substring(1)]);

  }, [category]);

  return docs.length ? <ul>{docs.map((doc, index) => <li key={`u-${index}`}><a href={`/${doc.id}`} onClick={onClick}>{doc.name}</a></li>)}</ul> : <Loading />;

}
