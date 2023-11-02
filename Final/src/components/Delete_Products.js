import React,{useState} from 'react'
import axios from 'axios'
import { useParams,redirect } from 'react-router-dom';

function Delete_Product() {

    const {id} = useParams();
    const [value, setvalue] = useState('yes');

    function Delete(){
        if(value==='yes'){
        axios.delete(`http://127.0.0.1:3001/DeleteProduct/${id}`)
        .then(response => {
            redirect("/product")
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
    }
    redirect("/product")


  }   

    return (
        <>

        <form onSubmit={Delete} action='/product'>
            <div className="form-group ">
                <button type="submit" class="btn btn-success">Yes</button>
                <button type="submit" onClick={()=>{setvalue('no')}} class="btn btn-danger">No</button>
            </div>
        </form>
    </>
    )  
}

export default Delete_Product