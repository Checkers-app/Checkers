import { Link } from 'react-router-dom';
import Header from "../components/sharedComps/Header.js"


function LandingPage() {



  return (
    <div className="rooms">
      <Header />
      <Link to="/game">Create New Game</Link>
    </div>
  );
}
export default LandingPage;