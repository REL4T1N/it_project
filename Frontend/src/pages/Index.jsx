import Header from "../components/header/Header";
import Premiere from "../components/premiere/premiere";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import Articles from "../components/articles/Articles";
import CardScroller from "../components/CardScroller/CardScroller";
import { fetchUser } from "../API/userAPI";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
function Index() {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        await fetchUser(setUser, setError);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <Premiere props={{ description: "Длинное описание" }} />
      <Features />
      <Articles />
      <p>{error}</p>
      <CardScroller />
      <Footer />
    </>
  );
}

export default Index;
