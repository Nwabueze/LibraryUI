import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Home() {

  const [books, setBooks] = useState([]);

  useEffect(async () => {
    const res = await axios.get("/library/book/all");
    if (res.data != "undefined") {
      setBooks(res.data);
    }
  }, [])

  return (
    <Container>
      {books.lenth < 1 ? (
      <div>
        <Typography variant="h6">Welcome to Library1</Typography>
      </div>
      )
      :
      <Typography variant="h6">Welcome to Library1</Typography>
      }
      <Link to="/login"><Typography variant="button">Login to add books</Typography></Link>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      {books.map((book, i) => (
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              First published {book.year}
            </Typography>
            <Typography variant="h5" component="div">
              Book Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {book.title}
            </Typography>
            <Typography variant="body2">
              ISBN {book.isbn}
              <br />
              {`Author ${book.author}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>

    </Container>
    
  );
}
