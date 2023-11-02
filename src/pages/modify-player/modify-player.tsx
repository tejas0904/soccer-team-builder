import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Snackbar, TextField, Typography, useTheme } from "@mui/material";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import BoxHeader from "../../components/box-header";
import { Player, Position } from "../../models/Player";
import "./modify-player.css";
import { useMutation } from "@apollo/client";
import { ALL_PLAYERS, INSERT_PLAYER } from "../../query/player";
import React, { useEffect, useState } from "react";
import CustomAlert from "../../components/alert";

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
});

const initialValues: Player = {
  name: "",
  position: Position.Select,
  email: "",
  phone: "",
  skillLevels: {
    ballControl: 0,
    attack: 0,
    defence: 0,
    agility: 0,
    speed: 0,
    // comments: "",
  },
};

const SliderComponent: React.FC<{ fieldName: string }> = ({ fieldName }) => {
  return (
    <Field type="number" name={fieldName}>
      {({ field, form }: any) => (
        <Slider
          {...field}
          value={field.value}
          onChange={(event, newValue: any) => {
            form.setFieldValue(field.name, newValue);
          }}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      )}
    </Field>
  );
};

const ModifyPlayers = () => {
  const theme = useTheme();

  const [insertPlayer, { loading, error, called }] = useMutation(INSERT_PLAYER, {
    refetchQueries: [{ query: ALL_PLAYERS }],
  });

  const handleFormSubmit = async (values: Player) => {
    console.log("handleFormSubmit :: ", values);
    await insertPlayer({
      variables: {
        playerInput: values,
      },
    });
  };

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    called && setSnackbarOpen(true);
  }, [called]);

  const onSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="20px">
      <BoxHeader title="Add player" />
      <Box p="20px" m="40px 0 0 0" bgcolor={theme.palette.primary[400]}>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleReset, handleSubmit }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h3" color={theme.palette.secondary[200]}>
                        Personal Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Phone Number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        name="phone"
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h3" color={theme.palette.secondary[200]}>
                        Skill Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="position">
                        {({ field, form }: any) => (
                          <FormControl fullWidth>
                            <InputLabel id="position-select-label">Position</InputLabel>
                            <Select
                              labelId="position-select-label"
                              id={field.name}
                              value={values.position}
                              label="Position"
                              onChange={(event, newValue: any) => {
                                form.setFieldValue(field.name, newValue?.props.value);
                              }}
                            >
                              <MenuItem value={Position.Select}>{Position.Select}</MenuItem>
                              <MenuItem value={Position.Forward}>{Position.Forward}</MenuItem>
                              <MenuItem value={Position.Midfield}>{Position.Midfield}</MenuItem>
                              <MenuItem value={Position.Defence}>{Position.Defence}</MenuItem>
                              <MenuItem value={Position.Goalie}>{Position.Goalie}</MenuItem>
                              <MenuItem value={Position.AllRounder}>{Position.AllRounder}</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" color={theme.palette.secondary[300]}>
                        Attack
                      </Typography>
                      <SliderComponent fieldName={"skillLevels.attack"} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" color={theme.palette.secondary[300]}>
                        Defence
                      </Typography>
                      <SliderComponent fieldName={"skillLevels.defence"} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" color={theme.palette.secondary[300]}>
                        Agility
                      </Typography>
                      <SliderComponent fieldName={"skillLevels.agility"} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" color={theme.palette.secondary[300]}>
                        Speed
                      </Typography>
                      <SliderComponent fieldName={"skillLevels.speed"} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h4" color={theme.palette.secondary[300]}>
                        Ball Control
                      </Typography>
                      <SliderComponent fieldName={"skillLevels.ballControl"} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Comments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comments}
                        name="comments"
                        error={!!touched.comments && !!errors.comments}
                        helperText={touched.comments && errors.comments}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container mt={2} spacing={2}>
                <Grid item>
                  <Button type="reset" color="primary" variant="outlined">
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="submit" color="secondary" variant="contained">
                    Add player
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={onSnackbarClose}>
          <CustomAlert onClose={onSnackbarClose} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
            {error ? "Cannot add a player" : "Player added"}
          </CustomAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ModifyPlayers;
