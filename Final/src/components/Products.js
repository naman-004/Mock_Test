import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom';

function Product() {
  const [data, setData] = useState([]);
  const [Categorydata, setCategoryData] = useState([]);
  const [filtereddata, setfilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/product/read')
    .then(response => {
      setData(response.data.data);
      setfilteredData(response.data.data);
    })
    .catch(error => {
      console.log('GET Request Error:', error);
    }); 

    axios.get('http://127.0.0.1:3001/category/read')
    .then(response => {
      setCategoryData(response.data.data);
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
    return value.prodname.includes(val)})
      )
    }
  }


  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">This is Product page</div>
    
    <div className="table-responsive">
    <div className="container text-align">
    Search Product Name : <input type="text" onChange={(e)=>{filter(e.target.value)}} placeholder="Search.."></input>
    </div>
    <button type="button" className='btn-dark bg-dark text-white'><Link to="/product/create">Add New</Link></button>
      <table className="table table-hover" >
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Product_name</th>
            <th scope="col">Category</th>
            <th scope="col">Cost</th>
            <th scope="col">Desc</th>
            <th scope="col">isActive</th>
            <th scope="col">functions</th>
          </tr>
        </thead>
        <tbody>
          {filtereddata.map((d,index) =>{
            return(<>
            <tr>

            <th scope="row">{index+1}</th>
            <td>{d.prodname}</td>
            <td>
            {Categorydata.map((da)=>{
              return(<>{d.prodcat.map((dat)=>{
                if(da.id===dat){
                  return(
                  <>{da.name}<br></br></>
                  )}
              
              })}</>)

            })}
            </td>
            <td>{d.cost}</td>
            <td>{d.description}</td>
            <td>{JSON.stringify(d.isactive)}</td>
            <td><button><Link to={`/update_product/${d.id}`}>Update</Link></button> / <button><Link to={`/delete_product/${d.id}`}>Delete</Link></button></td>
          </tr>
          </>)
          })}
          
          
        </tbody> 
      </table>
    </div>
    </>
  )
}

export default Product