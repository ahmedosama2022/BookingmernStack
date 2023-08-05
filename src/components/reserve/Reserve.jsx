import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import "./reserve.css";
import { useNavigate } from "react-router-dom";

import { SearchContext } from '../Context/SearchContext';
const Reserve = ({ setOpen, hotelId }) => {
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);
     
    const [selectedRooms, setSelectedRooms] = useState([])
const {dates} = useContext(SearchContext)

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] 
            : selectedRooms.filter((item) => item !== value))
    }
    

    // get ring time 
    const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
     list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
    }
    
    const alldates =  getDatesInRange(dates[0].startDate, dates[0].endDate)
     const isAvailable = (roomNumbers) => {
        const isFound = roomNumbers.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
            );

            return !isFound
     }

     const navigate = useNavigate();


    const handleClick = async () => {
       try {
        await Promise.all(selectedRooms.map(roomId => {
            const res = axios.put(`http://localhost:5000/api/room/availability/${roomId}`, {dates:alldates});
            return res.data
        }))
        setOpen(false)
        navigate("/");
       } catch (error) {
        
       }
      };
    return (
        <div className="reserve">
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <br></br>
                <div className="rDesc" style={{color: "#0071c2"}}>{item.desc}</div>
                <div className="rMax">
                    <br></br>
                  <span style={{color: "#0071c2"}}>Max people</span>:   <b>{item.maxPeople}</b>
                </div>
                <br></br>
                <div className="rPrice"><span style={{color: "#0071c2"}}>Price:</span> {item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumber.map((roomNumbers) => (
                  <div className="room">
                    <label>{roomNumbers.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumbers._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumbers)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleClick} className="rButton">
            Reserve Now!
          </button>
        </div>
      </div>
    )
}

export default Reserve
