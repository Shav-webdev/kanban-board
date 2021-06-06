import React from "react";
import "./_Board.scss";
import { ICardItem } from "../Card/Card";

interface IBoard {
  boardTitle: string;
  classname?: string;
  id?: string;
  children?: JSX.Element[] | JSX.Element;
}

const Board = (props: IBoard) => {
  const updateCardData = (itemData: ICardItem) => {
    return {
      ...itemData,
      status: props.boardTitle,
    };
  };

  const updateLSData = (updatedCardData: ICardItem) => {
    const allCardsFromLSStr = localStorage.getItem("allCards");
    let allCardsFromLSArr;

    if (allCardsFromLSStr) {
      allCardsFromLSArr = JSON.parse(localStorage.getItem("allCards") || "");
    }

    let foundIndex = allCardsFromLSArr.findIndex(
      (x: ICardItem) => x.id == updatedCardData.id,
    );
    allCardsFromLSArr[foundIndex] = updatedCardData;
    if (allCardsFromLSArr && Array.isArray(allCardsFromLSArr)) {
      localStorage.setItem("allCards", JSON.stringify([]));
      localStorage.setItem("allCards", JSON.stringify([...allCardsFromLSArr]));
    }
  };

  const onDrop = (e: {
    target: EventTarget;
    dataTransfer: DataTransfer;
    preventDefault: () => void;
  }) => {
    e.preventDefault();

    const cardData = JSON.parse(e.dataTransfer.getData("card-id"));

    const card = document.getElementById(cardData.id);

    if (card) {
      // @ts-ignore
      card.style.display = "block";
    }
    // @ts-ignore
    e.target.appendChild(card);

    updateLSData(updateCardData(cardData));
  };

  const onDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className={"single-board-wrapper"}>
      <h3 className={"board-title"}>{props.boardTitle}</h3>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        id={props.id}
        className={`${props.classname} board`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Board;
