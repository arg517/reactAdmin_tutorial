import React, { useCallback } from "react";

import {
  SimpleForm,
  TextInput,
  Edit,
  required,
  Toolbar,
  SaveButton,
  useUpdate,
  useNotify,
  useRefresh,
  useRedirect,
  useEditController,
  DeleteWithConfirmButton,
  useRecordContext,
  Button,
  SelectInput,
  useInput,
  // CreateCategory,
} from "react-admin";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import Button from "@mui/material/Button";

const useEventStyles = makeStyles((theme) => ({
  divider_mt1: {
    margin: "1em 0",
    width: "100%",
  },
}));

const EditViewToolbar = (props) => {
  const navigate = useNavigate();
  const record = useRecordContext();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleGoBack}
        label={"Back"}
      />

      <div>
        {/* <DeleteWithConfirmButton
          style={{ marginRight: "1rem" }}
          confirmContent="You will not be able to recover this record. Are you sure?"
          translateOptions={({ name: record.name }, { id: "" })}
        /> */}
        <CustomEditButton disabled={false} />
      </div>
    </Toolbar>
  );
};

const CustomEditButton = (props) => {
  const [update] = useUpdate("users");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const refresh = useRefresh();
  const { basePath } = props;

  const handleEdit = useCallback(
    (id, values, redirect) => {
      console.log("handle edit ::", id, values, redirect)
      let field = { ...values };
      let uid = field.id;
      delete field.id;
      update(
        "users",
        {
          payload: {
            data: field,
            id: uid,
          },
        },
        // {
        //   onFailure: (error) => {
        //     notify(
        //       error.status === 400 ? error.message : error.body.error,
        //       "error",
        //       {
        //         smart_count: 1,
        //       }
        //     );
        //   },
        //   onSuccess: ({ data: newRecord }) => {
        //     console.log("Updated data ::", newRecord);
        //     notify("User Updated Successfully", "info", {
        //       smart_count: 1,
        //     });
        //     // refresh();
        //     redirectTo(redirect, basePath, newRecord.id, newRecord);
        //   },
        // }
      )
        .then(res => res.json)
        .then(data => console.log("test", data))
        .catch(error => console.log(error))
    },
    [update, notify, redirectTo, basePath]
  );
  // set onSave props instead of handleSubmitWithRedirect
  return <SaveButton {...props} onSave={handleEdit} />;
};


const EditView = ({ ...props }) => {
  // const classes = useEventStyles();
  const requiredValidate = [required()];

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditViewToolbar />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">User Edit</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              label="First Name"
              source="name.firstname"
              variant="outlined"
              validate={requiredValidate}
            ></TextInput>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              label="Last Name"
              source="name.lastname"
              variant="outlined"
              validate={requiredValidate}
            ></TextInput>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextInput
              label="Email"
              source="email"
              variant="outlined"
              validate={requiredValidate}
            ></TextInput>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextInput
              label="Mobile Number"
              source="phone"
              variant="outlined"
              validate={requiredValidate}
            ></TextInput>
          </Grid>
          <Divider variant="middle" />
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default EditView;
