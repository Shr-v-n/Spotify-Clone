import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./Footer.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { ReactComponent as NextSong } from "../../svgs/nextSong.svg";
import { ReactComponent as PrevSong } from "../../svgs/prevSong.svg";
import { ReactComponent as PlayIcon } from "../../svgs/playIcon.svg";
import { ReactComponent as LoopSong } from "../../svgs/loopSong.svg";
import { ReactComponent as ShuffleSongs } from "../../svgs/shuffleSongs.svg";
import { ReactComponent as PauseIcon } from "../../svgs/pauseIcon.svg";
import { ReactComponent as MuteIcon } from "../../svgs/muteIcon.svg";
import { ReactComponent as MutedIcon } from "../../svgs/mutedIcon.svg";
import {
  chooseSong,
  playSong,
  pauseSong,
  loopSong,
  unLoopSong,
  setVolume,
  toggleMute,
} from "../../redux/songPlayer/songPlayerSlice";

interface SongInterface {
  id: number;
  title: string;
  artist: string;
  file: string;
  img: string;
  lyricsAvailable: boolean;
  lyrics: string;
  durationDisplay: string;
  durationSeconds: number;
}

const Footer = () => {
  const songPlayer = useSelector((state: RootState) => state.songPlayerStore);
  const allSongs = useSelector(
    (state: RootState) => state.allSongsStore.allSongs
  ) as SongInterface[];

  const currentSong = allSongs.find(
    (song) => song.id === songPlayer.currentSongID
  ) as SongInterface;

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const isDraggingSeek = useRef(false);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);
  const isDraggingVolume = useRef(false);
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const dispatch = useDispatch();
  const [elapsedTime, setElapsedTime] = useState("0:00");

  const playAudio = () => {
    dispatch(playSong());
  };

  const pauseAudio = () => {
    dispatch(pauseSong());
  };

  const prevSong = () => {
    dispatch(chooseSong(songPlayer.currentSongID - 1));
  };

  const nextSong = () => {
    dispatch(chooseSong(songPlayer.currentSongID + 1));
  };

  const loopSongIcon = () => {
    dispatch(loopSong());
  };

  const unLoopSongIcon = () => {
    dispatch(unLoopSong());
  };

  const handleMute = () => {
    dispatch(toggleMute());
  };

  const formatTime = () => {
    if (audioRef.current !== null) {
      const sec = audioRef.current.currentTime;
      const minutes = Math.floor(sec / 60);
      const seconds = Math.floor(sec % 60);
      setElapsedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }
  };

  const handleSongEnd = useCallback(() => {
    if (songPlayer.looped === true) {
      if (audioRef.current !== null) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      dispatch(chooseSong(songPlayer.currentSongID + 1));
    }
  }, [dispatch, songPlayer]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = songPlayer.isMuted ? 0 : songPlayer.volume;

    if (songPlayer.playing === true) {
      audio.play().catch((err) => console.warn("Play interrupted:", err));
    } else {
      audio.pause();
    }

    audio.addEventListener("ended", handleSongEnd);

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSong, handleSongEnd, dispatch, songPlayer]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (
        !isDraggingVolume.current ||
        !audioRef.current ||
        !volumeBarRef.current
      )
        return;
      const rect = volumeBarRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const clamped = Math.min(Math.max(percent, 0), 1);
      dispatch(setVolume(clamped));
    };

    const stopDragging = () => {
      isDraggingVolume.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingSeek.current || !seekBarRef.current) return;
      const rect = seekBarRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const clamped = Math.min(Math.max(percent, 0), 1);
      setDragPercent(clamped);
    };

    const stopDragging = () => {
      if (isDraggingSeek.current && dragPercent !== null && audioRef.current) {
        audioRef.current.currentTime = dragPercent * audioRef.current.duration;
      }
      isDraggingSeek.current = false;
      setDragPercent(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [dragPercent]);

  useEffect(() => {
    const intervalId = setInterval(() => formatTime(), 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={Styles.mainContainer}>
      {currentSong !== undefined ? (
        <>
          <div className={Styles.songDataContainer}>
            <img
              id={`${Styles.imgContainer}`}
              src={currentSong.img}
              alt="footer Song Img"
            />
            <p id={`${Styles.songNameContainer}`}>
              {currentSong.title} - {currentSong.artist}
            </p>
          </div>

          <div className={Styles.footerMid}>
            <audio
              controls
              id={Styles.audioControls}
              key={songPlayer.currentSongID}
              ref={audioRef}
              // muted
            >
              <source src={currentSong.file} type="audio/mp3"></source>
            </audio>

            <div className={Styles.controlIcons}>
              <ShuffleSongs className={Styles.icon} id={Styles.shuffleIcon} />
              <PrevSong className={Styles.icon} onClick={() => prevSong()} />
              {songPlayer.playing === true ? (
                <PauseIcon
                  className={Styles.icon}
                  id={Styles.pauseIcon}
                  onClick={() => pauseAudio()}
                />
              ) : (
                <PlayIcon
                  className={Styles.icon}
                  id={Styles.playIcon}
                  onClick={() => playAudio()}
                />
              )}
              <NextSong className={Styles.icon} onClick={() => nextSong()} />
              {songPlayer.looped === true ? (
                <LoopSong
                  className={Styles.icon}
                  id={Styles.loopActiveIcon}
                  onClick={() => unLoopSongIcon()}
                />
              ) : (
                <LoopSong
                  className={Styles.icon}
                  id={Styles.loopIcon}
                  onClick={() => loopSongIcon()}
                />
              )}
            </div>

            <div
              className={Styles.seekBarContainer}
              onMouseDown={(e) => {
                isDraggingSeek.current = true;
                const rect = seekBarRef.current!.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const clamped = Math.min(Math.max(percent, 0), 1);
                setDragPercent(clamped);
              }}
            >
              {audioRef.current !== null ? (
                <>
                  <span className={Styles.time}>{elapsedTime}</span>

                  <div className={Styles.seekBar} ref={seekBarRef}>
                    <div
                      className={Styles.seekFill}
                      style={{
                        width: `${
                          (dragPercent !== null
                            ? dragPercent
                            : (audioRef.current?.currentTime || 0) /
                              (audioRef.current?.duration || 1)) * 100
                        }%`,
                      }}
                    />
                    <div
                      className={Styles.seekThumb}
                      style={{
                        left: `${
                          (dragPercent !== null
                            ? dragPercent
                            : (audioRef.current?.currentTime || 0) /
                              (audioRef.current?.duration || 1)) * 100
                        }%`,
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className={Styles.songVolumeContainer}>
            {!songPlayer.isMuted ? (
              <MuteIcon
                onClick={() => handleMute()}
                className={Styles.muteIcon}
              />
            ) : (
              <MutedIcon
                onClick={() => handleMute()}
                className={Styles.muteIcon}
                id={Styles.mutedIcon}
              />
            )}
            <div
              className={Styles.seekBar}
              ref={volumeBarRef}
              onMouseDown={(e) => {
                isDraggingVolume.current = true;
                const rect = volumeBarRef.current!.getBoundingClientRect();
                const clickPercent = (e.clientX - rect.left) / rect.width;
                dispatch(setVolume(clickPercent));
              }}
            >
              <div
                className={Styles.seekFill}
                style={{ width: `${songPlayer.volume * 100}%` }}
              />
              <div
                className={Styles.seekThumb}
                style={{ left: `${songPlayer.volume * 100}%` }}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
