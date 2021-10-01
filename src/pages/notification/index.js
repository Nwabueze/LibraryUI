import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  padY25: {
    paddingTop: `25px`, paddingBottom: `25px`
  },
}));

export default function SubheaderDividers() {

  const classes = useStyles();

  const [readerList, setReaderList] = useState([]);
  
  useEffect(() => {
    (async ()=>{
      const res = await axios.get("/library/reader/borrowed");
      if (res.data) {
        const user = [];
        const readers = res.data;
        for (var i = 0; i < readers.length; i++) {
          const books = { name: `${readers[i].firstname} ${readers[i].lastname}`, titles: [] };
          for (var j = 0; j < readers[i].books.length; j++) {
            books.titles.push(`Title: ${readers[i].books[j].title} ISBN: ${readers[i].books[j].isbn}`);
          }
          user.push(books);
        }
        setReaderList(user);
      }
    })()
  },[])


  return (

    readerList.length < 1 ? null : (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.padY25}>List of book holders</Typography>
        <List className={classes.root}>
          {readerList.map((reader) =>
          (
            <React.Fragment>
              <ListItem>
                <ListItemText primary={`User: ${reader.name}`} secondary={`(${reader.titles.length}) ${reader.titles.join(", ")}`} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          )
          )}
        </List>
      </div>
    )
  );
}
