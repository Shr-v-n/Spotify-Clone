import Styles from "./Library.module.css";
import createIcon from "../../assets/icons/createIcon.png";
const Library = () => {
  return (
    <div className={Styles.mainContainer}>
      <header className={Styles.header}>
        <p>Your Library</p>
        <div className={Styles.createIconContainer}>
          <img src={createIcon} className={`${Styles.createIcon} ${Styles.featureNotAdded}`} alt='createIcon'/>
        </div>
      </header>
      <div className={Styles.libraryFilters}>

          
          
      </div>
    </div>
  );
};

export default Library;
