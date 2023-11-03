import { useEffect, useState } from 'react';
import './App.css';
import {NutritionComponent} from './NutritionComponent';
import { LoaderPage } from "./LoaderPage";



function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);


  const MY_ID ="445c3b90";
  const MY_KEY = "b1aee6f87632e9efb75f95fd851072db";
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }


  const myNutritionSearch = (e) => {
    setMySearch (e.target.value);
  }

  const finalSearch = (e) =>{
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div className="App">

      {stateLoader && <LoaderPage />}
      <h1 className='container'>Nutrition Analysis</h1>


        <form onSubmit={finalSearch} className='container'>
          <input className='search' placeholder='Search...' onChange={myNutritionSearch} value={mySearch}/>
          <button>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png" className="icons" alt="ico"/>
        </button>
        </form>


       <div>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }

        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <NutritionComponent
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
        </div>
      </div>


  );
}
export default App;
