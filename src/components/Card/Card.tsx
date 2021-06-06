import React, { useEffect, useMemo, useState } from "react";
import "./_Card.scss";
import {
  createStyles,
  Grid,
  Popover,
  Theme,
  Typography,
} from "@material-ui/core";
import { users } from "../../utils";
import Card from "@material-ui/core/Card";
import StatusFlag from "../StatusFlag/StatusFlag";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 220,
      padding: "5px 10px",
      margin: "10px 5px",
    },
    status: {
      display: "flex",
      justifyContent: "flex-end",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

export interface ICardItem {
  classname?: string;
  status: string;
  description?: string;
  id?: string;
  draggable?: boolean;
  user: string | number | null;
}

export interface ICard {
  item: ICardItem;
}

const CardItem = (props: ICard) => {
  const classes = useStyles();
  const [status, setStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const onDragEnd = () => {
    let cards;
    let cardsLS = localStorage.getItem("allCards");
    if (cardsLS) {
      cards = JSON.parse(cardsLS);
      const item = cards.find((card: ICardItem) => card.id === props.item.id);
      if (item) {
        setStatus(item.status);
      } else if (props.item.status) {
        setStatus(props.item.status);
      }
    }
  };

  useEffect(() => {
    onDragEnd();
  }, [localStorage.getItem("allCards"), props.item.status]);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onDragStart = (
    e: {
      target: EventTarget | HTMLElement | HTMLDivElement;
      dataTransfer: DataTransfer;
    },
    item: ICardItem,
  ) => {
    const cardData = JSON.stringify(item);

    // @ts-ignore
    e.dataTransfer.setData("card-id", cardData);
  };

  const onDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const username = useMemo(() => {
    return users.find((user) => user.id === props.item.user)?.name;
  }, [users]);

  return (
    <Card
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={(e) => onDragStart(e, props.item)}
      id={props.item.id}
      draggable={props.item.draggable}
      className={`${classes.root} ${props.item.classname}`}
      variant="outlined"
    >
      <CardContent>
        <Grid className={"boards_wrapper"} container>
          <Grid item xs>
            User name - {username ? username : ""}
          </Grid>
          <Grid
            classes={{
              root: classes.status,
            }}
            item
            xs
          >
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              id={`${props.item.id}-popover`}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
            >
              {status}
            </Popover>
            <Typography
              className={"status-flag-wrapper"}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <StatusFlag status={status} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            {props.item.description}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default React.memo(CardItem);
