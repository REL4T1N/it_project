import Header from "../components/header/Header"
import Premiere from "../components/premiere/premiere";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import Articles from "../components/articles/Articles";
import { useState, useEffect } from "react";
function Index() {
  async function CookieUser(){
    try {
      const res = await fetch("/api/users/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        // User is not authenticated
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }
    const [user, setUser] = useState(null);
    useEffect(() => {
      CookieUser();
    }
    , []);
      return (
        <>
            <Header user={user}/>
            <Premiere props={{description: "Длинное описание"}}/>
            <Features/>
            <Articles/>
            <Footer/>
        </>
      );
}

export default Index