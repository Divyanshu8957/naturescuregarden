import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import PlantsList from "./components/PlantsList";  
import PlantsDetails from "./Pages/PlantsDetails";  
import Home from "./Pages/Home";
import HerbalWisdom from "./components/HerbalWisdom";
import HerbalIntro from "./components/HerbalIntro";
import About from "./Pages/About";
import Footer from "./components/Footer";

import Herba from "../Herba";
import Categories from "./Pages/Categories";

function App() {
  return (
    <Router>  {/* ✅ Ensure the entire app is wrapped inside Router */}
      <Navbar />  
      <Routes>
        <Route path="/" element={ <>
        <Home/>
        <ImageSlider /> 


          
        <HerbalIntro  />
        <PlantsList />
        <HerbalWisdom/>    

        <Footer/>
        
        </> 
         
      
      }  />
       
        <Route path="/plants/:id" element={<PlantsDetails />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/herba" element={<Herba/>} />
        <Route path="/categories" element={<Categories/>} />

      </Routes>
    </Router>
  );
}

export default App;
