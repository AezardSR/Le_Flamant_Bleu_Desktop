import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/AddEventPlanning.css';

const UpdateEventPromos = () => {

    const [name, setName] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [duration, setDuration] = useState([]);

    const [formationType, setFormationType] = useState([]);
    const [formationType_id, setFormationType_id] = useState('');

    const [formationFormat, setFormationFormat] = useState([]);
    const [formationFormat_id, setFormationFormat_id] = useState('');

    const { promotionID } = useParams();

    const fetchPromotion = async () => {
        const response = await fetch(`http://localhost:8000/api/promos/` + promotionID);
        const data = await response.json();
        setName(data.name);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDuration(data.duration);
        setFormationType_id(data.formationType_id);
        setFormationFormat_id(data.formationFormat_id);
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/promos-formats')
            .then(response => response.json())
            .then(data => setFormationFormat(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:8000/api/promos-types')
            .then(response => response.json())
            .then(data => setFormationType(data))
    }, [])

    useEffect(() => {
        fetchPromotion();
    }, [promotionID]);

    function updatePromotions(e) {
        e.preventDefault()
        fetch('http://localhost:8000/api/promos/' + promotionID, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                startDate: startDate,
                endDate: endDate,
                duration: duration,
                formationType_id: formationType_id,
                formationFormat_id: formationFormat_id
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
      <div>
        <form className='form-add-event-planning'>
            <div className='add-event-date'>
                Date de début<input value={startDate} onChange={(event) => {setStartDate(event.target.value)}} name="startDate" type="date"></input>
            </div>
            <div className='add-event-date'>
                Date de fin<input value={endDate} onChange={(event) => {setEndDate(event.target.value)}} name="endDate" type="date"></input>
            </div>

            <div className='add-event-description'>
                <input value={name} onChange={(event) => {setName(event.target.value)}} name="name" className='add-event-description-title' placeholder='Titre -'></input>
                <input value={duration} onChange={(event) => {setDuration(event.target.value)}} name="duration" className='add-event-description-title' placeholder='Durée -'></input>
            </div>

            Type de la formation :
            <select className="p-5px w-100 h-45px" style={{marginBottom: '20px', fontSize: 'Medium'}} onChange={(event) => {setFormationType_id(event.target.value)}} value={formationType_id}>
                {formationType.map((type) => (
                    <option key={type.id} value={type.id}>{type.id} : {type.name}</option>
                ))}
            </select>

            Format de la formation :
            <select className="p-5px w-100 h-45px" style={{marginBottom: '20px', fontSize: 'Medium'}} onChange={(event) => {setFormationFormat_id(event.target.value)}} value={formationFormat_id}>
                {formationFormat.map((format) => (
                    <option key={format.id} value={format.id}>{format.id} : {format.name}</option>
                ))}
            </select>
            
            <div>
                <button className='btn btn-add-event-planning' onClick={updatePromotions}>Modifier</button>
            </div>
        </form>
      </div>
    )
}

export default UpdateEventPromos