import _ from "lodash";
import { Card, CardContent, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({}));

function UnitDescription(props) {
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardContent>
          <b>{props.unit.NAME}</b>
          <br />
          HP:{props.unit.HP}
          <br />
          ATTACK:{props.unit.ATK}
          <br />
          RANGE:{props.unit.RANGE}
          <br />
          DEFENSE:{props.unit.DEF}
          <br />
          MOVEMENT:{props.unit.MOV}
        </CardContent>
      </Card>
    </>
  );
}

export default UnitDescription;
