import Styles from "./navbar.module.css";
import { setQuery, clearQuery } from "../../redux/searchSlice/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ReactComponent as CrossIcon } from "../../svgs/crossIcon.svg";
const logo = "/assets/images/Spotify_Logo_RGB_Green.png";
const homeIcon = "/assets/icons/home-agreement.png";
const searchIcon = "/assets/icons/searchicon.png";
const profileIcon = "/assets/icons/profileicon.png";

const Navbar = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const handleClear = () => {
    setSearchText("");
    dispatch(clearQuery());
  };

  return (
    <div className={`${Styles.mainContainer}`}>
      <div className={`${Styles.logoContainer}`}>
        <img src={logo} alt="Spotify-Logo" className={Styles.logo} />
      </div>

      <div className={`${Styles.midContainer}`}>
        <div className={Styles.homeIconContainer}>
          <img src={homeIcon} className={Styles.homeIcon} alt="Home Icon" />
        </div>

        <div className={Styles.searchContainer}>
          <img
            src={searchIcon}
            className={Styles.searchIcon}
            alt="Search Icon"
          />
          <input
            autoComplete="off"
            value={searchText}
            onChange={handleInputChange}
            id="searchInput"
            type="text"
            placeholder="Search for a song"
            className={Styles.searchBox}
          />
          <CrossIcon className={Styles.crossIcon} onClick={handleClear} />
        </div>
      </div>

      <div className={`${Styles.accountControls}`}>
        <img
          src={profileIcon}
          className={Styles.profileIcon}
          alt="Profile Icon"
        />
      </div>
    </div>
  );
};

export default Navbar;
