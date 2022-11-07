import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store';
import axios from 'axios';
import Table from "react-bootstrap/Table";
function CardModal(props) {
  const counterLike = useSelector((state) => state.counter1)
  const counterDisLike = useSelector((state) => state.counter2)
  const counterLike1 = useSelector((state) => state.counter3)
  const counterDisLike1 = useSelector((state) => state.counter4)
  const counterLike2 = useSelector((state) => state.counter5)
  const counterDisLike2 = useSelector((state) => state.counter6)
  const [data, setData] = useState()
  const dispatch = useDispatch();
  const handleClick = () => {
    props.setSharedUrl(props.url)
    props.setids(props.id)
    dispatch(actions.setTitle(props.title))
    dispatch(actions.setDescription(props.description))
    dispatch(actions.setUrl(props.url))
    dispatch(actions.setPoster(props.ItemImagee))
    console.log('DisLikes', props.dislikes)
    console.log('Likes', props.likes)
  }
  const handleLikes = async () => {

    await axios.put(`http://localhost:5000/api/ReactPlayerUserData/${props.id}/0`)
      .then(() => console.log("Data updated Like successfully"))
    axios.get('http://localhost:5000/api/ReactPlayerUserData')
      .then((data) => dispatch(actions.setData(data)));
  }
  const handleDisLikes = async () => {
    await axios.put(`http://localhost:5000/api/ReactPlayerUserData/${props.id}/1`)
      .then(() => console.log("Data updated Like successfully"))
    axios.get('http://localhost:5000/api/ReactPlayerUserData')
      .then((data) => dispatch(actions.setData(data)));
  }

  return (

    <div className='card_details' style={{ width: "10rem", padding: 10 }}>
      <Table>
        <tbody>
          <tr>
            <td>
              <img src={props.ItemImagee} style={{ width: "5rem", height: "5rem" }} onClick={handleClick} alt="" />
            </td>
            <td>
              <p>{props.title}</p>
              <p style={{ color: "blue", fontSize: 20, cursor: "pointer" }} onClick={handleClick}>Play</p>
              <br />
              {props.email}
            </td>
            <td>
              <p style={{ color: "Green", fontSize: 20, cursor: "pointer" }} onClick={handleLikes}>Likes {props.likes}</p>
            </td>
            <td>
              <p style={{ color: "Red", fontSize: 20, cursor: "pointer" }} onClick={handleDisLikes}>DisLikes {props.dislikes}</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CardModal;