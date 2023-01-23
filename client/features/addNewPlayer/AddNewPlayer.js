import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";
import { Widget } from "../widget/Widget";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function AddNewPlayer({ addNewPlayer }) {
  return (
    <Widget>
      <CardActionArea onClick={addNewPlayer}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Add New Player
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AddRoundedIcon
              sx={{
                fontSize: "150px",
                marginTop: "50px",
                marginBottom: "70px",
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Widget>
  );
}
