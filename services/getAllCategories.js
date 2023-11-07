
import axios from "axios";

const getAllCategories = async ()=> {
    let categories
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
        categories = response.data
    }  catch (error) {
    console.error(error);
  }
  console.log("print categories:",categories)
  return categories
}


export default getAllCategories;