import React,{useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Update_Category() {
    const {id} = useParams();
    const[data,setdata]=useState('Update page')
    const[category,setcategory]=useState('')
    const[v,setvalue]=useState('')

    function Update_Category(){
        alert(v)
        axios.post(`http://127.0.0.1:3001/UpdateCategory/${id}`,{'ColName':category,'V':v})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }

  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form onSubmit={Update_Category} action='\category'>
  <div class="form-group"> 
    Field
    <div class="form-group col-md-4">
      Field
      <select id="inputState" onChange={(e)=>setcategory(e.target.value)} class="form-control" required>
        <option selected>Choose</option>
        <option value="name">Category</option>
        <option value="isactive">Active/Inactive</option>
        <option value="description">Description</option>
      </select>
    </div>
  </div>
  <div class="form-group">
    Value
    <input type="text" class="form-control"  onChange={(e)=>{setvalue(e.target.value);console.log(e.target.value,v)}}  placeholder="Value" required/>
  </div>
  <button type="submit"  class="btn btn-primary">Update</button>
</form>
</>
  )

}

export default Update_Category