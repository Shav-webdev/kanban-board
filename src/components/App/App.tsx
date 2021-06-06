import React from "react";
import "./_App.scss";
import Board from "../Board/Board";
import Grid from "@material-ui/core/Grid";
import { boards, cards } from "../../utils";
import { useEffect, useState } from "react";
import CardItem, { ICardItem } from "../Card/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    flexWrap: "nowrap",
    padding: "0 80px",
    overflowX: "hidden",
  },
});

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState([]);

  useEffect(() => {
    const dataFromLS = localStorage.getItem("allCards");

    if (!dataFromLS) {
      const cardsArr = JSON.stringify(cards);
      localStorage.setItem("allCards", cardsArr);
      // @ts-ignore
      setState([...cards]);
    } else {
      setState(JSON.parse(dataFromLS));
    }
  }, [localStorage.getItem("allCards")]);

  return (
    <Grid
      className={`boards_wrapper ${classes.container}`}
      container
      spacing={3}
    >
      {boards.map((el) => {
        return (
          <Grid key={el.id} item xs>
            <Board
              boardTitle={el.title}
              id={el.id}
              classname={`${el.classname} board scrollbar`}
            >
              {state
                .filter((elem: ICardItem) => elem.status === el.title)
                .map((item: ICardItem) => {
                  return <CardItem key={item.id} item={item} />;
                })}
            </Board>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default App;
