import React from "react";
import Styles from "./SongCard.module.css";
import { ReactComponent as PlayIcon } from "../../../assets/icons/playIcon.svg";

const SongCard = (props) => {
  return (
    <div className={`${Styles.mainContainer}`} onClick={props.onClick}>
      <PlayIcon className={Styles.playButton} />
      <img id={`${Styles.imgContainer}`} src={props.song.img} />
      <p id={`${Styles.title}`}>{props.song.title}</p>
    </div>
  );
};

export default SongCard;
