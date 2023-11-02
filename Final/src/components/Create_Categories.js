import React,{useState} from 'react'
import axios from 'axios'

function Add_category() {
    const[CatName,setCatName]=useState('')
    const[Isactive,setIsActive]=useState('')
    const[Description,setDescription]=useState('')

    function Add_Cateogry(){
        axios.post(`http://127.0.0.1:3001/CreateCategory`,{'name':CatName,'isactive':Isactive,'description':Description})
        .then(response => {
        console.log(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }
  return (
    <>
    <form action='\category' onSubmit={Add_Cateogry}>
        <div class="form-group">
            <label for="exampleInputPassword1">Name of Category</label>
            <input type="text" class="form-control"  onChange={(e)=>setCatName(e.target.value)}  placeholder="Category_Name" required/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Active / Inactive : </label><br></br>
            Active<input class="form-check-input" value='1' onChange={(e)=>{setIsActive(e.target.value)}} type="radio" name="flexRadioDefault" required/>
            <br></br>Inactive<input class="form-check-input" value='0' onChange={(e)=>{setIsActive(e.target.value)}} type="radio" name="flexRadioDefault" required/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control"  onChange={(e)=>setDescription(e.target.value)}  placeholder="Descr" required/>
        </div>
        <button type="submit"  class="btn btn-primary">Add</button>
    </form>
    </>
  )
}

export default Add_category