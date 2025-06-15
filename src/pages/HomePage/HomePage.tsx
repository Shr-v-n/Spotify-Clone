import Styles from './HomePage.module.css'
import Navbar from '../../components/navbar/Navbar'
import LeftSidebar from '../../components/leftSidebar/LeftSidebar'
import Library from '../../components/Library/Library'
import CurrentSong from '../../components/CurrentSong/CurrentSong'
import Footer from '../../components/Footer/Footer'

const FrontPage = () => {
  return (
    <div className={Styles.mainContainer}>

      <Navbar />

      <div className={Styles.middleContainer}> 

        <LeftSidebar />

        <Library />

        <CurrentSong />

      </div>

      <Footer />

    </div>
  )
}

export default FrontPage
