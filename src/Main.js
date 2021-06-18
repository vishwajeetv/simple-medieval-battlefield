import _ from "lodash";
import { Card, CardContent, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import UnitDescription from "./UnitDescription";

const useStyles = makeStyles((theme) => ({
  cell: {
    height: theme.spacing(10),
  },
}));

function Main() {
  let infantryUnit = {
    NAME: "INFANTRY",
    HP: 15,
    ATK: 3,
    RANGE: 1,
    DEF: 2,
    MOV: 1,
  };

  let cavalryUnit = {
    NAME: "CAVALRY",
    HP: 20,
    ATK: 3,
    RANGE: 1,
    DEF: 1,
    MOV: 2,
  };

  let rangedUnit = {
    NAME: "RANGED",
    HP: 10,
    ATK: 3,
    RANGE: 2,
    DEF: 1,
    MOV: 1,
  };

  let initialMatrix = [
    {
      id: 1,
      cells: [
        { id: 1, unit: _.clone(infantryUnit) },
        { id: 2, unit: _.clone(rangedUnit) },
        { id: 3, unit: _.clone(cavalryUnit) },
      ],
    },
    { id: 2, cells: [{ id: 4 }, { id: 5 }, { id: 6 }] },
    {
      id: 3,
      cells: [
        { id: 7, unit: _.clone(infantryUnit) },
        { id: 8, unit: _.clone(rangedUnit) },
        { id: 9, unit: _.clone(cavalryUnit) },
      ],
    },
  ];

  const [matrix, setMatrix] = useState(initialMatrix);

  const [startCellSelected, setStartCellSelected] = useState(null);
  const [startCell, setStartCell] = useState(null);
  const [targetCell, setTargetCell] = useState(null);
  const selectCell = (cellId, rowId, cell) => {
    let newMatrix = matrix;
    newMatrix.map((row) => {
      if (row.id === rowId) {
        let cells = row.cells;
        cells.map((cell) => {
          if (cell.id === cellId) {
            if (startCellSelected === true) {
              // if (cell.state && cell.state === "TARGETED") {
              //invalid case.
              // cell.state = null;
              // setStartCellSelected(null);
              // } else {
              if (startCell.unit) {
                cell.state = `TARGETED by ${startCell.unit.NAME}`;
                if (cell.unit) {
                  cell.unit.HP =
                    cell.unit.HP - (startCell.unit.ATK - cell.unit.DEF);
                }
              }

              setTargetCell(cell);
              setStartCellSelected(false);
              // }
            } else {
              // if (cell.state && cell.state === "STARTED") {
              //   cell.state = null;
              //   setStartCellSelected(null);
              // }
              if (true) {
                cell.state = "STARTED";
                setStartCell(cell);
                setStartCellSelected(true);
              } else if (startCellSelected === false) {
                cell.state = null;
                setStartCellSelected(null);
              }
            }
          } else {
            cell.state = null;
          }
          return cell;
        });
        row.cells = cells;
        return row;
      }
    });

    let copy = [...newMatrix];
    setMatrix(copy);
  };

  const classes = useStyles();

  return (
    <>
      Battlefield
      {_.map(matrix, (row) => {
        return (
          <>
            <Grid
              id={row.id}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {_.map(row.cells, (cell) => {
                return (
                  <>
                    <Grid item xs={4} key={cell.id}>
                      <Card
                        className={classes.cell}
                        onClick={() => {
                          selectCell(cell.id, row.id, cell);
                        }}
                      >
                        <CardContent>
                          {cell.unit?.NAME}
                          {cell.unit?.NAME && <>---</>}
                          {cell.state}
                          <br />
                          {cell.unit ? `HP ${cell.unit.HP}` : ``}
                          {cell.unit?.HP === 0 ? " XX DEAD" : ""}
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        );
      })}
      <br />
      <br />
      <br />
      Start Cell - {startCell?.id} <br />
      Target Cell - {targetCell?.id}
      <br />
      <br />
      Units:
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <UnitDescription unit={infantryUnit} />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <UnitDescription unit={rangedUnit} />
        </Grid>
        <Grid item xs={4}>
          {" "}
          <UnitDescription unit={cavalryUnit} />
        </Grid>
      </Grid>
    </>
  );
}

export default Main;
