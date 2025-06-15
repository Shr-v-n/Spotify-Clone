import Styles from "./navbar.module.css";
import logo from "../../assets/images/Spotify_Logo_RGB_Green.png";
import homeIcon from "../../assets/icons/home-agreement.png";
import searchIcon from "../../assets/icons/searchicon.png"
import profileIcon from "../../assets/icons/profileicon.png"

const Navbar = () => {
  return (
    <div className={`${Styles.mainContainer}`}>
      <div className={`${Styles.logoContainer}`}>
        <img src={logo} alt="Spotify-Logo" className={Styles.logo} />
      </div>

      <div className={`${Styles.midContainer}`}>
        <img src={homeIcon} className={Styles.homeIcon} alt="Home Icon"/>
        <div className={Styles.searchContainer}>
          <img src={searchIcon} className={Styles.searchIcon} alt="Search Icon"/>
          <input type="text" placeholder="Search for a song" className={Styles.searchBox}/>
          </div>
      </div>

      <div className={`${Styles.accountControls}`}>
        <img src={profileIcon} className={Styles.profileIcon} alt="Profile Icon"/>
      </div>
    </div>
  );
};

export default Navbar;
