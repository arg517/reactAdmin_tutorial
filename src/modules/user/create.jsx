import React, { useCallback, Fragment } from "react";
import {
  SimpleForm,
  SelectInput,
  Toolbar,
  SaveButton,
  Create,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
  required,
} from "react-admin";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useEventStyles = makeStyles((theme) => ({
  divider_line: {
    width: "100%",
    margin: "1em 0",
  },
}));
const Title = ({ record }) => {
  return <span>{record.name}</span>;
};
const CreateViewToolbar = (props) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Toolbar
      sx={{ display: "flex", justifyContent: "space-between", color: "white" }}
    >
      <Button
        variant="contained"
        label="Back"
        color="secondary"
        size="large"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleGoBack}
      />
      <CustomSaveButton label="Save" submitOnEnter={false} />
    </Toolbar>
  );
};
const CustomSaveButton = (props) => {
  const [create] = useCreate("users");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;

  const handleSave = useCallback(
    (values, redirect) => {
      let field = values;
      create(
        {
          payload: {
            data: {
              name: {
                firstname: field.firstname,
                lastname: field.lastname
              },
              email: field.email,
              phone: field.phone,
              address: {},
              password: "123",
              username: field.firstname
            },
          },
        },
        {
          onFailure: (Error) => {
            notify("Internal Server Error", "error", {
              smart_count: 1,
            });
          },
          onSuccess: ({ data: newRecord }) => {
            console.log("new user recorde ::", newRecord);
            notify(`User created successfully.`, "success");
            redirectTo(redirect, basePath, newRecord.id, newRecord);
          },
        }
      );
    },
    [create, notify, redirectTo, basePath]
  );
  // set onSave props instead of handleSubmitWithRedirect
  return <SaveButton {...props} onSave={handleSave} label="Save" />;
};


const CreateView = (props) => {
  const classes = useEventStyles();
  const history = useNavigate();
  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Fragment>
      <Grid item xs={12} sm={4}></Grid>
      <Create title="Create a user" {...props}>
        <SimpleForm toolbar={<CreateViewToolbar />}>
          <Grid container spacing={2} fullWidth={true}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Create User</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                label="First name"
                source="name.firstname"
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                label="Last name"
                source="name.lastname"
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextInput
                source="email"
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextInput
                source="phone"
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            {/* <Grid item xs={12} sm={3}>
              <SelectInput
                source="has_netbanking_enach"
                label="Has Netbanking Enach"
                fullWidth={true}
                validate={required()}
                variant="outlined"
                choices={[
                  { id: "true", name: "True" },
                  { id: "false", name: "False" },
                ]}
              ></SelectInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelectInput
                source="has_debitcard_enach"
                label="Has Debitcard Enach"
                fullWidth={true}
                validate={required()}
                variant="outlined"
                choices={[
                  { id: "true", name: "True" },
                  { id: "false", name: "False" },
                ]}
              ></SelectInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelectInput
                source="deleted"
                label="Deleted"
                fullWidth={true}
                validate={required()}
                variant="outlined"
                choices={[
                  { id: "true", name: "True" },
                  { id: "false", name: "False" },
                ]}
              ></SelectInput>
            </Grid> */}
            <Divider className={classes.divider_line} variant="middle" />
          </Grid>
        </SimpleForm>
      </Create>
    </Fragment>
  );
};
export default CreateView;
