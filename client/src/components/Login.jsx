import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { Link }from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  navlink: {
    color: "blue",
    margin: "5px",
    fontSize: "15px",
    textDecoration: "none",
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link className={classes.navlink} href="#" >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Login() {
  const classes = useStyles();

  const onSubmit = (values) => {
    console.log(values);
    axios.post('http://localhost:3001/auth/login', values)
     .then(resp => console.log(resp))
     .catch(err => console.error(err));
  };
  const validationSchema = Yup.object({
    emailid: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(5).max(16).required("Required"),
  });

  const initialValues = {
    emailid: "",
    password: "",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={classes.form}>
            <Field name="emailid">
              {({ field, form, meta }) => {
                return (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    {...field}
                    error={form.touched.emailid && form.errors.emailid}
                    helperText={
                      form.touched.emailid && form.errors.emailid
                        ? form.errors.emailid
                        : null
                    }
                  />
                );
              }}
            </Field>

            <Field name="password">
              {({ field, form, meta }) => {
                return (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    autoComplete="password"
                    {...field}
                    error={form.touched.password && form.errors.password}
                    helperText={
                      form.touched.password && form.errors.password
                        ? form.errors.password
                        : null
                    }
                  />
                );
              }}
            </Field>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forget" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
