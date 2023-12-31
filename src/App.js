import { useCallback, useEffect, useState } from 'react';
import './App.css';
import {NutritionComponent} from './NutritionComponent';
import { LoaderPage } from "./LoaderPage";
import Swal from 'sweetalert2';

function App() {

  const [mySearch, setMySearch] = useState(""); // what user enters into the input field
  const [wordSubmitted, setWordSubmitted] = useState(''); //initial state - no analysis, changed state - got analysis
  const [myNutrition, setMyNutrition] = useState(); // data form API 
  const [stateLoader, setStateLoader] = useState(false); // Loader state

  const MY_ID ="80273800";
  const MY_KEY = "d7ad75ad2a3b9cea5c00131a1fe83dc7";
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const fetchData = useCallback ( async (ingr) => {
    setStateLoader(true);

    const alertFault =()=>{
      Swal.fire(
        'Ingredients are entered incorrectly',
        'Follow an example: 1 apple, 1 cup strawberries, 100ml milk',
        'Try again!'
      )
    }
    const alertLimits =()=>{
      Swal.fire("Usage limits are exceeded");
    } 

    const response = await fetch(`${APP_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })
    console.log(response.status);
    
    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    }
    else if (response.status === 429) {
      setStateLoader(false);
      alertLimits();
    }
    else {
      setStateLoader(false);
      alertFault();
    }
  }, [])

  const myNutritionSearch = (e) => {
    setMySearch (e.target.value);
  }
// при нажатии на enter или на кнопку newSearch (функция finalSearch)
// меняется состояние на то, что написано в поиске
  const finalSearch = (e) =>{
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
// при нажатии на кнопку updateSearch сбросить строку input на пустую
   const updateSearch = () => {
    setMySearch("");
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted, fetchData])

  return (
  <div className="App">

      {stateLoader && <LoaderPage />}
      <h1 className='container'>Nutrition Analysis</h1>

      <div className='table'>
        <form onSubmit={finalSearch} className='block'>
          <input className='search'
            placeholder='Enter Your Ingredients, ex: 1 apple, 1 cup strawberries, 100 ml milk...'
            onChange={myNutritionSearch}
            spellCheck="true"
            type='text'
            lang='en' value={mySearch}
            />

          <div className='line'>
            <button onClick={updateSearch}
            spellCheck="true"
            type='button'
            lang='en' value={mySearch}>
              update search
            </button>
      
            <button type='submit'>
              new search
            </button>
          </div>
        </form>
       <div>

          <div className='container line'>
            <p><span className="label">YOUR INGREDIENTS:</span> {wordSubmitted}</p>
          </div>

          <div className='mainNutrition line'>
          {
            myNutrition && <p><span className="label">calories:</span> {myNutrition.calories} kcal</p>
          }

          {
            myNutrition && <p><span className="label">carbs:</span> {myNutrition.totalNutrients.CHOCDF.quantity.toFixed(1)} g</p>
          }

          {
            myNutrition && <p><span className="label">fat:</span> {myNutrition.totalNutrients.FAT.quantity.toFixed(2)} g</p>
          }

          {
            myNutrition && <p><span className="label">protein:</span> {myNutrition.totalNutrients.PROCNT.quantity.toFixed(1)} g</p>
          }
          </div>

          <hr className='underline'></hr>
        
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }, index) =>
              <NutritionComponent key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  </div>
  );
}

export default App;
