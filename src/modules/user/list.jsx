import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
} from "react-admin";
import Filter from "./filter";
import boldHeaderStyle from "../../utils/commonStyle";
import rowStyle from "../../utils/rowStyle";
import { useTheme } from "@mui/material/styles";

const ListView = ({ selectedRow, ...props }) => {
  const classes = boldHeaderStyle;
  const theme = useTheme();

  return (
    <List
      {...props}
      filters={<Filter />}
      // filterDefaultValues={{ status: " " }}
      // sort={{ field: "created_at", order: "DESC" }}
      bulkActionButtons={false}
    >
      <Datagrid
        classes={{ headerCell: classes.boldHeaderStyle().headerCell }}
        rowStyle={rowStyle(null, theme)}
        optimized
        {...props}
        bulkActionButtons={false}
        sx={{
          backgroundColor: "rgba(0,0,0,.05)",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#2196f3",
            color: "white",
          },
        }}
      >
        <TextField source="name.firstname" sortable={true} label="First name" />
        <TextField source="name.lastname" sortable={true} label="Last name" />
        <TextField source="email" sortable={false} label="E-mail" />
        <TextField source="phone" sortable={false} label="Mobile No." />
        <ShowButton {...props} />
        <EditButton {...props} />
      </Datagrid>
    </List>
  );
};

export default ListView;
