import React, {useState} from 'react';
import "./dataset-II.scss";
import { useNavigate } from 'react-router-dom';
import Back from "../../assets/svg/Back.svg";
import Cross from '../../assets/svg/cross.svg';
import DII from "../../assets/svg/D2.svg";
import Polygon from '../../assets/svg/Polygon 3.svg';
import Two from '../../assets/png/2.png';
import Line from '../../assets/svg/line.svg';
import Ring from "../../assets/svg/ringround.svg";

const DatasetII = () => {
    const navigate = useNavigate();
    const handleDatasetI = () => {
        navigate("/create-dataset-I")
    };
    const [formData, setFormData] = useState({
      server:"",
      userName:"",
      password:"",
    })

    let handleNameChange = (event) => {
      let fieldValue = event.target.name;
      let newValue = event.target.value;
      setFormData((currData)=> {
        return{...currData, [fieldValue]: newValue}
      });
    };

    let handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/create-dataset-III");
    }


  return (
    <div className='main-container-dataset-II'>
        <div className='header-dataset-II'>
        {/* Adding Header */}
      <div>
  <img src={Back} alt="logo" style={{cursor:"pointer"}} onClick={handleDatasetI}/>
 </div>
 <div>
  <img src={Cross} alt="logo"/>
 </div>
      </div>
        {/* Main container */}
        <div className='container-dataset-II'>
      {/* first row */}
      <div className='first-row-dataset-II'>
      <p>Create a Dataset</p>
      <img src={DII} alt="logo"/>
      <div className='second-row-dataset-II'>
        <img src={Polygon} alt="logo"/>
      </div>
      <div className='ring-dataset-II'>
        <img src={Ring} alt="logo"/>
      </div>
      </div>
      <div className='third-row-dataset-II'>
      <img src={Two} alt="logo"/>
      </div>
      <div className='header-dashboard-modals'>
          <p>Enter Credentials</p>
          <img src={Line} alt="logo"/>
        </div>
           {/* Adding Form */}
           <div>
            <form className='form-container-dataset-II' onSubmit={handleSubmit}>
              <div className='form-container-dataset-II-input-details'>
                {/* first row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                 type='text'
                  placeholder='Server'
                   name='server' 
                   id='server'
                   value={formData.server}
                   onChange={handleNameChange}
                   required/>
            </div>
            {/* second row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                 type='text'
                  placeholder='Username' 
                  name='userName'
                  id='userName'
                  value={formData.userName}
                  onChange={handleNameChange}
                  required/>
            </div>
            {/* third row */}
            <div className='input-group-sign-in-row-I-dataset-II'>
                <input className='input-details-sign-in-row-I-dataset-II'
                 type='password'
                 placeholder='Password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleNameChange}
                  required />
            </div>
            </div>
            <div className='button-dataset-II'>
            <button type='submit'>Connect</button>
        </div>
            </form>
        </div>
       
        </div>
    </div>
  )
}

export default DatasetII;
