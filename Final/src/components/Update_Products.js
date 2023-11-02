import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Update_product() {
  const { id } = useParams();
  const [category, setcategory] = useState('')
  const [v, setvalue] = useState('')
  const [updatedCategories,setUpdatedCategories]=useState([])
  // const [categorydata, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/category/read')
      .then(response => {
        if (response.data) {
          setUpdatedCategories(response.data.data);
        }
      })
      .catch(error => {
        console.log('GET Request Error:', error);
      });
  }, []);

  function Update_Category() {
    axios.post(`http://127.0.0.1:3001/UpdateProduct/${id}`, { 'ColName': category, 'ColV': v })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log('GET Request Error:', error);
      });
  }

  return (
    <>
      <form onSubmit={Update_Category} action='\product'>
        <div class="form-group">
          Field
          <div class="form-group col-md-4">
            Field
            <select id="inputState" onChange={(e) => setcategory(e.target.value)} class="form-control" required>
              <option selected>Choose...</option>
              <option value="Product_name">Product name</option>
              <option value="ProdCat">Product Category</option>
              <option value="Product_cost">cost</option>
              <option value="Product_Desc">Description</option>
              <option value="is_active">Active/Inactive</option>
            </select>
          </div>
        </div>
        {
          category === "ProdCat" ? (
            <>
              <div class="form-group">
                Select Category of Product
                {updatedCategories.map((catdata) => {
                  return (<li><input type='checkbox' onChange={(e) => {
                    if (v.includes(e.target.value)) {
                      setvalue(v.filter((data) => {
                        return !(data === e.target.value)
                      }))
                    }
                    else {
                      setvalue([...v, e.target.value])
                    }
                  }
                  } value={catdata.id} />{catdata.name}<br></br></li>)
                })}
              </div>
            </>) : (
            <>
              <div class="form-group">
                <label for="exampleInputPassword1">Value</label>
                <input type="text" class="form-control" onChange={(e) => setvalue(e.target.value)} placeholder="Value" required />
              </div>
            </>)
        }


        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </>
  )
}

export default Update_product