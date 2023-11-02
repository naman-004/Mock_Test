import React, { useState, useEffect } from "react";
import axios from 'axios';

function ProductForm() {

  const [category,setcategory]=useState([])
  const[value2,setvalue2]=useState([])
  const [ProductName, setProductName] = useState('')
  // const [ProductCat, setProductCat] = useState('')
  const [ProductCost, setProductCost] = useState('')
  const [ProductDesc, setProductDesc] = useState('')
  const [isActive, setisActive] = useState('')
  // const [categorydata, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/category/read')
      .then(response => {
        if (response.data) {
          setcategory(response.data.data);
          // setCategoryData(response.data.data);
        }

      })
      .catch(error => {
        console.log('GET Request Error:', error);
      });
  }, []);

  function Create_Product() {
    // alert(ProductCat)
    axios.post(`http://127.0.0.1:3001/product/create`, { 'prodName': ProductName, 'ProdCat': value2, 'cost': ProductCost, 'isactive': isActive, 'description': ProductDesc })

      .then(response => {
        console.log(response.data.data)
      })
      .catch(error => {
        console.log('GET Request Error:', error);
      });
  }

  return (
    <form onSubmit={Create_Product} action='/product'>
      product name<input
        type="text"
        placeholder="product name"
        value={ProductName} setProductCat
        onChange={(e) => setProductName(e.target.value)} required />
      categories
      {category.map((catdata) => {
        return (<li><input type='checkbox' onChange={(e) => {
          if (value2.includes(e.target.value)) {
            setvalue2(value2.filter((data) => {
              return !(data === e.target.value)
            }))
          }
          else {
            setvalue2([...value2, e.target.value])
          }
        }
        } value={catdata.id} />{catdata.name}<br></br></li>)
      })}
      {/* ProductCat<select class="form-select" aria-label="Default select example" onChange={(e)=>setProductCat(e.target.value)} required>
        <option value='0' selected>none</option>
                {categorydata.map((catdata)=>{
                    return(<option value={catdata.category_id}>{catdata.cat_name}</option>)
                })}
        </select> */}
      cost<input type="number" class="form-control" value={ProductCost} onChange={(e) => setProductCost(e.target.value)} required />
      Active<input class="form-check-input" value='1' onChange={(e) => { setisActive(e.target.value) }} type="radio" name="RadioDefault" required />
      Inactive<input class="form-check-input" value='0' onChange={(e) => { setisActive(e.target.value) }} type="radio" name="RadioDefault" required />
      description<input type="text" class="form-control" value={ProductDesc} onChange={(e) => setProductDesc(e.target.value)} placeholder="Descr" required />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProductForm;