import React, { useEffect, useRef} from "react";
import Styles from "./SongCard.module.css";
import { ReactComponent as PlayIcon } from "../../../svgs/playIcon.svg";

const SongCard = (props) => {
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      if (props.selected) {
        mainRef.current.style.backgroundColor = "rgb(88, 88, 88)";
        mainRef.current.style.borderRadius = "0px";
      } else {
        mainRef.current.style.backgroundColor = "";
        mainRef.current.style.borderRadius = "20px";
      }
    }
  }, [props.selected]);

  return (
    <div
      className={`${Styles.mainContainer}`}
      onClick={props.onClick}
      ref={mainRef}
    >
      <PlayIcon className={Styles.playButton} />
      <img id={`${Styles.imgContainer}`} src={props.song.img} alt="songImg" />
      <p id={`${Styles.title}`}>{props.song.title}</p>
    </div>
  );
};

export default React.memo(SongCard);
