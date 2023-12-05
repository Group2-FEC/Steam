import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./FrontPage";
import GameInfo from "./GameInfo";
import Library from "./Library";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import Upcoming from "./Upcoming";
const WishContext = createContext();
export { WishContext };
const GameContext = createContext();
export { GameContext };
const App = () => {
  const [gameInfo, setGameInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const getGameDetails = async (id) => {
    try {
      const response = await axios.get(`/api/game/${id}`);
      setGameInfo(response.data);
      setShowInfo(!showInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get("api/videogames");
      setWishlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleCloseButton = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="min-h-[100dvh]">
      <WishContext.Provider value={{ wishlist, setWishlist }}>
        <Header />
        <GameContext.Provider value={getGameDetails}>
          <div className="bg-blue-700/20 drop-shadow-[0_10px_10px_black]">
          <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/upcoming" element={<Upcoming />}></Route>
            <Route path="/library" element={<Library />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
          </Routes>
          </div>
        </GameContext.Provider>
      </WishContext.Provider>
      {showInfo && (
        <GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
      )}
      <Footer />
    </div>
  );
};

export default App;
