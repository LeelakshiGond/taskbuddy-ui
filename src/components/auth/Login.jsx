import React, { useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import FormInput from "../form/FormInput";
import image from "../../assets/images/google.png";
import { useFormik } from "formik";
import theme from "../themeData/theme";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { userLoggedIn } = useAuth();

  const loginUsingEmailAndPassword = async (e) => {
    e.preventDefault();
    await doSignInWithEmailAndPassword(
      formik.values.email,
      formik.values.password
    );
    navigate("/home");
  };

  const loginUsingGoogleProvider = async (e) => {
    e.preventDefault();
    await doSignInWithGoogle().catch((err) => alert(err));
    navigate("/home");
  };
  return (
    <>
      {userLoggedIn ? (
        <Navigate to="/home" />
      ) : (
        <Paper sx={{ px: 2, py: 4, maxWidth: "380px", mx: "auto" }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography fontWeight={"bold"}>Welcome Back!</Typography>

              <Typography
                color="secondary"
                sx={{ textAlign: "left", width: "100%" }}
              >
                Please enter your details.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormInput label="Email" formik={formik} name="email" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormInput label="Password" formik={formik} name="password" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  fullWidth
                  size="small"
                  onClick={loginUsingEmailAndPassword}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography textAlign={"center"}>
                New User?{" "}
                <Typography
                  component={"span"}
                  onClick={() => navigate("/register")}
                  sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
                >
                  Create Account
                </Typography>
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ color: theme.palette.primary.main }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="small"
                  fullWidth
                  onClick={loginUsingGoogleProvider}
                  variant="outlined"
                >
                  <img
                    src={image}
                    height={16}
                    width={16}
                    style={{ objectFit: "contain", marginRight: 8 }}
                    alt="Google"
                  />
                  Sign In With Google
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
