export default function () {
  return {
    root: {
      flex: '1 0 100%',
    },
    hero: {
      minHeight: '95vh', // Makes the hero full height until we get some more content.
      backgroundColor: 'eee',
    },
    content: {
      paddingTop: '4vh',
      maxWidth: '75vw',
    },
    menu: {
      paddingTop: '4vh',
      cursor: 'pointer',
    },
    news: {
      paddingLeft: 16,
      paddingTop: '4vh',
    },
    button: {
      marginTop: 18,
    },
    logo: {
      width: '16vw',
      height: '16vw',
      maxWidth: 100,
      maxHeight: 100,
    },
  };
}
