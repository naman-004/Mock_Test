import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom';

function Category() {

  const [data, setData] = useState([]);
  const [filtereddata, setfilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/category/read')
    .then(response => {
      setData(response.data.data);
      setfilteredData(response.data.data);
    })
    .catch(error => {
      console.log('GET Request Error:', error);
    }); 
  },[]);

  function filter(val){

    if(val===''){
      setfilteredData(data)
    }
    else{
      setfilteredData(
        data.filter((value)=>{
    return value.cat_name.includes(val)})
      )
    }
  }

return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">This is category page</div>
    
    <div className="table-responsive">

    <div className="container text-align">
      Search Category Name : <input type="text" onChange={(e)=>{filter(e.target.value)}} placeholder="Search.."></input>
    </div>

    <button type="button" className='btn-dark bg-dark text-white'><Link to="/category/create">Add New</Link></button>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Category</th>
            <th scope="col">Active</th>
            <th scope="col">Desc</th>
            <th scope="col">functions</th>
          </tr>
        </thead>
        <tbody>
          {filtereddata.map((d,index) =>{
            return(<>
            <tr>
            <th scope="row">{index+1}</th>
            <td>{d.name}</td>
            <td>{JSON.stringify(d.isactive)}</td>
            <td>{d.description}</td>
            <td><button><Link to={`/update_category/${d.id}`}>Update</Link></button> / <button><Link to={`/delete_category/${d.id}`}>Delete</Link></button></td>
          </tr>
          </>)
          })}
        </tbody> 
      </table>
    </div>
    </>
)
}

export default Category
