import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { handleEmail, isValidHumanName, passwordWatch } from '../utils/inputHandler';
import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({...props}) {
  const classes = useStyles();

  useEffect(() => {

  })
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNames = (str, index) => {
    if(index === 1){
      if(isValidHumanName(str) === true){
        setFirstName(str);
        return;
      }

      setFirstName("");
    }else if(index === 2){
      if(isValidHumanName(str) === true){
        setLastName(str);
        return;
      }

      setLastName("");
    }
  }
  
  const handleEmailInput = (str) => {
    
    if(handleEmail(str) === true){
      setEmail(str);
      return;
    }
    
    setEmail("");
  }
  
  const handlePasswordInput = (str) => {
    
    const watch = passwordWatch(str);
    if(watch === true){
      setPassword(str);
      return;
    }else if(watch === "true"){
      // It's weak password, show some warning
      setPassword(str);
      return;
    }
  
    setPassword("");
  }
  
  const register = async () => {
    
    if(!firstname || !lastname || !email || !password){
      alert("Invalid input was detected");
      return;
    }

    const data = { "firstname": firstname, "lastname": lastname, "email": email, "password": password };
    const res = await axios.post(`/library/reader/register`, data);
  
    if(res.data === 0){
      alert("Email address already in use");
      // Email address already exists
    }else if(res.data === 1){
      // Registration was successful
      sessionStorage.setItem("names", `${firstname} ${lastname}`);
      props.history.push('/dashboard');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={ (e) => { handleNames(e.target.value, 1) } }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={ (e) => { handleNames(e.target.value, 2) } }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={ (e) => { handleEmailInput(e.target.value) } }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ (e) => { handlePasswordInput(e.target.value) } }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ register }
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}