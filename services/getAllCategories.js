
import axios from "axios";
const getAllCategories = async()=> {
    let meals
   try {
    axios.get("www.themealdb.com/api/json/v1/1/categories.php")
    .then(result=> meals=result.data.meals)
   }
   catch(error){
    console.log(error)
   }
   
}

export default getAllCategories;