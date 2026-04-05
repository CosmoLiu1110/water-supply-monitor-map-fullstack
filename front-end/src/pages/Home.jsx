import CleanWaterImage from "../assets/CleanWaterImage.webp";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="firsthomepage">
      
        <img src={CleanWaterImage} alt="image" className= "CleanWater-Image" />
        
        <div className="overlay"></div>

        <h1 className="onscreentext">
            SDG 6: Clean Water and Sanitation - <br /> Learn how we're helping communities <br /> access safe water. Explore our project, <br /> understand the challenges, <br /> and see how you can make a difference!
        </h1>
          
        <h2 className="onscreentext2">
            Discover More ↓
        </h2>

        </div>
    
      <div className="secondhomepage">
        <h3 className="onscreentext3">
          Main Targets
        </h3>

        <h5 className="onscreentext4">
          Learn more about our project and goals through our introduction page.
        </h5>
  
    

        <div className="card-container">
          <div className="card1"> 
          <h4 className="title1">
            Universal access to safe drinking water for all
            </h4>
          <p className="paragraph1"> 
            Ensures everyone has safe, affordable water through wells and reliable pumps.
          </p>
        </div>

        <div className="card2"> 
          <h4 className="title2">
            Access to adequate sanitation and hygiene
            </h4>
          <p className="paragraph2"> 
            Ensures everyone has proper toilets, handwashing facilities, and hygienic conditions with clean water. 
          </p>
        </div>


        <div className="card3"> 
          <h4 className="title3">
            Improve water quality and infastructure
            </h4>
          <p className="paragraph2"> 
            Reduces water pollution, treats wastewater, and supports durable water infastructure.
          </p>
        </div>

    </div>
    </div>
  </>
              
  ); 
}
export default Home;