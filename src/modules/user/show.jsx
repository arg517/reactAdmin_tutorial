import {
  SimpleForm,
  Toolbar,
  useRecordContext,
  Button,
  Show,
  TextInput
  // CreateCategory,
} from "react-admin";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import Button from "@mui/material/Button";

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
    </Toolbar>
  );
};


const ShowView = ({ ...props }) => {

  return (
    <Show {...props}>
      <SimpleForm toolbar={<EditViewToolbar />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">User Details</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <TextField source="name.firstname" label="First name" /> */}
            <TextInput
              label="First Name"
              source="name.firstname"
              variant="outlined"
              // validate={requiredValidate}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              label="Last Name"
              source="name.lastname"
              variant="outlined"
              // validate={requiredValidate}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextInput
              label="Email"
              source="email"
              variant="outlined"
              disabled
            />
          </Grid>

          {/* <Grid item xs={12} sm={3}>
            <SelectInput source="countryCode" choices={categories} />
          </Grid> */}
          <Grid item xs={12} sm={3}>
            <TextInput
              label="Mobile Number"
              source="phone"
              variant="outlined"
              disabled
            />
          </Grid>
          <Divider variant="middle" />
        </Grid>
      </SimpleForm>
    </Show>
  );
};

export default ShowView;
