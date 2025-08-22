import React, { useState } from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import FormInput from "../form/FormInput";
import { useFormik } from "formik";
import theme from "../themeData/theme";
import { doCreateUserWithEmailAndPassword } from "../../auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await doCreateUserWithEmailAndPassword(
        values.userName,
        values.email,
        values.password,
        values.confirmPassword
      );
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <>
      <Paper
        component={"form"}
        onSubmit={formik.handleSubmit}
        sx={{ px: 2, py: 4, maxWidth: "380px", mx: "auto" }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={"bold"} textAlign={"center"}>
              Register{" "}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInput
              label="User Name"
              required={true}
              formik={formik}
              name="userName"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInput
              label="Email"
              required={true}
              formik={formik}
              name="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInput
              label="Password"
              required={true}
              formik={formik}
              name="password"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInput
              label="Confirme Password"
              formik={formik}
              name="confirmPassword"
              required={true}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button fullWidth type="submit" size="small" variant="contained">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
