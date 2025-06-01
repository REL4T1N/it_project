import Header from "../components/header/Header";
import Premiere from "../components/premiere/premiere";
import Footer from "../components/footer/Footer"
import CardScroller from "../components/CardScroller/CardScroller";
import { fetchUser, GetPremiere, GetNew, GetRecMovies, GetTops, GetAITops } from "../API/UserAPI";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ErrorPage from "../components/ErrorPage";
function Index() {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [premiere, setPremiere] = useState(null);
  const [newMovies, setNewMovies] = useState(null);
  const [tops, setTops] = useState(null)
  const [rec, setRec] = useState(null);
  const [isRequested, setIsRequested] = useState(false);
  const [AITops, setAITops] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        if (!isRequested) {
          Promise.all([
            GetPremiere(setPremiere),
            GetNew(setNewMovies),
            fetchUser(setUser),
            GetTops(setTops)
          ]);
        }
        setIsRequested(true)
        if (user) {
          Promise.all([
            GetRecMovies(setRec),
            GetAITops(setAITops)
          ]);
        }
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, [user]);
  if (error) { 
    console.log(error.message);
    return <ErrorPage err_code={error.status}/>;
  }
  return (
    <>
      <Header />
      <Premiere props={premiere} />
      <CardScroller text="Уже в кино >" data={newMovies}/>
      {user && <CardScroller text="На основе ваших вкусов" data={rec} />}
      <CardScroller text="Сочные топы >" data={tops}/>
      {user && <CardScroller text="По советам AI >" data={AITops}/>}
      <Footer />
    </>
  );
}

export default Index;
