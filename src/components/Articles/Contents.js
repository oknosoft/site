/**
 * Иерархический список (оглавление) статей
 *
 * @module Contents
 *
 * Created by Evgeniy Malyarov on 26.04.2018.
 */

import React, {Component} from 'react';
import MUITypography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconBulleted from '@mui/icons-material/FormatListBulleted';

import SubLink from 'metadata-ui/Markdown/SubLink';
import cn from 'clsx';

const Typography = styled(({ children, ...props }) =>
  <MUITypography
    component="a"
    variant="subtitle1"
    color="primary"
    {...props}>{children}
  </MUITypography>)(({ theme }) => ({
  display: 'list-item',
  marginLeft: theme.spacing(3),
}));

export default function Contents({docRef, link}) {
  const [rows, setRows] = React.useState([]);
  const rawNavigate = useNavigate();
  const navigate = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    rawNavigate(href);
  };
  React.useEffect(() => {
    const {cat: {articles}, adapters: {pouch}} = $p;
    const doc = articles.get(docRef);
    const refs = [];
    const rows = [];
    for(const {paper} of doc.articles) {
      rows.push(paper);
      if(paper.is_new()) {
        refs.push(paper.ref);
      }
    }
    (refs.length ? pouch.load_array(articles, refs) : Promise.resolve())
      .then(() => setRows(rows));

  }, [docRef]);

  return <>
    <MUITypography component="h3" variant="h6">Связанные статьи:</MUITypography>
    {rows.filter((doc) => {
      if(doc.acl.find({role: '_anonymous'})) {
        return true;
      }
      // const session = $p.superlogin.getSession();
      // return session && session.roles.some((role) => {
      //   return doc.includes(role) || doc.includes(`r-${role}`);
      // });
    })
      .map((doc, index) => {
        const href = `/${doc.id}`;
        return <Typography
          key={`cnt-${index}`}
          href={href}
          onClick={(e) => navigate(e, href)}
        >{doc.name}</Typography>;
      })}
  </>;
}
