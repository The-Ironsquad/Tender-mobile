
import axios from "axios";

const getAllCategories = async ()=> {
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
    }  catch (error) {
    console.error(error);
  }
   
  return response.data.categories
}


export default getAllCategories;