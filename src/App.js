import './App.css';
import BorderList from './pages/BorderList';
import ImageUploader from './pages/ImgaeUolader';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/border' element={<ImageUploader/>}/>
        <Route path='/' element={<BorderList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
