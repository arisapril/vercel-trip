import "./TripStyles.css";
import axios from "axios";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function TripData(props) {
  const cookies = new Cookies();
  const navigate = useNavigate();

  async function submit() { 
    const response = await axios.post('http://localhost:5000/api/buy',{trips:props.heading,amount:1,names:cookies.get('user')});
    alert('จองสำเร็จ');
    navigate('/view');
  }

  return (
    <div className="t-card" onClick={submit}>
      <div className="t-image">
        <img src={props.image} alt="trip" />
      </div>
      <h4>{props.heading}</h4>
      <p>{props.text}</p>
    </div>
  );
}

export default TripData;
