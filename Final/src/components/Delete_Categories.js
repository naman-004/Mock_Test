import React,{useState} from 'react'
import axios from 'axios'
import { useParams,redirect } from 'react-router-dom';

function Delete_Category() {

    const {id} = useParams();
    const [value, setvalue] = useState('yes');

    function Delete(){
        if(value==='yes'){
        axios.delete(`http://127.0.0.1:3001/DeleteCategory/${id}`)
        .then(response => {
            redirect("/category")
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
    }
    redirect("/category")


  }   

    return (
        <>
        <form onSubmit={Delete} action='\category'>
            <div className="form-group ">
                <button type="submit" class="btn btn-success">Yes</button>
                <button type="submit" onClick={()=>{setvalue('no')}} class="btn btn-danger">No</button>
            </div>
        </form>
    </>
    )  
}

export default Delete_Category