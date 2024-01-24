/* eslint-disable import/no-anonymous-default-export */
import { makeStyles } from "@mui/styles";


// export const useStyles = makeStyles((theme) => ({
//   // Your styles here
//   headerCell: {
//     backgroundColor: "#f5f5f5",
//     fontWeight: "bold",
//   },
// }));

export default {
  boldHeaderStyle: makeStyles({
    headerCell: {
      backgroundColor: "#f5f5f5",
      fontWeight: "bold",
    },
  }),
};
