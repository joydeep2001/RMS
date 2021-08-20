import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const onSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = Yup.object({
    fname: Yup.string().required("Required"),
    lname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(5).max(16).required("Required"),
  });

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
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
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="fname">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="First Name"
                        autoFocus
                        {...field}
                        error={form.touched.fname && form.errors.fname}
                        helperText={
                          form.touched.fname && form.errors.fname
                            ? form.errors.fname
                            : null
                        }
                      />
                    );
                  }}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="lname">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Last Name"
                        {...field}
                        error={form.touched.lname && form.errors.lname}
                        helperText={
                          form.touched.lname && form.errors.lname
                            ? form.errors.lname
                            : null
                        }
                      />
                    );
                  }}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="email">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        {...field}
                        error={form.touched.email && form.errors.email}
                        helperText={
                          form.touched.email && form.errors.email
                            ? form.errors.email
                            : null
                        }
                      />
                    );
                  }}
                </Field>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {/*upload button*/}
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
            {/*upload button*/}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
