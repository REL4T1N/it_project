import Header from "../components/header/Header"
import FilmCard from "../components/film_cards/FilmCard";
import Premiere from "../components/premiere/premiere";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import Articles from "../components/articles/Articles";
function Index() {
      return (
        <>
            <Header/>
            <Premiere/>
            <Features/>
            <Articles/>
            <Footer/>
        </>
      );
}

export default Index