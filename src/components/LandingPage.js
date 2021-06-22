import Header from "../components/sharedComps/Header.js"
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div className="rooms">

      <Header />

      <Link to="/game">Create New Game</Link>

    </div>
  );
}

export default LandingPage;