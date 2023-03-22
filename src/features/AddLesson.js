import { getByTitle } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import '../css/AddLesson.css';

const AddLesson = () => {

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [duration, setDuration] = useState([]);

  // const [categoryID, setCategoryID] = useState('');
  // const [categories, setCategories] = useState([]);

  const [partsID, setPartsID] = useState('');
  const [parts, setParts] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/categories/')
  //     .then(response => response.json())
  //     .then(data => setCategories(data))
  // }, [])

  useEffect(() => {
    fetch('http://localhost:8000/api/parts/')
      .then(response => response.json())
      .then(data => setParts(data))
  }, [])

  const handleSubmit = (event) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: title, content: description, duration: duration, parts_id: partsID})
    };

    fetch('http://localhost:8000/api/lessons', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        event.preventDefault();
  }

    return (
      <div>
        <form className="form-add-lesson">

            <div className='form-add-lesson-add-title'>
                <input value={title} onChange={(event) => {setTitle(event.target.value)}} className="form-add-lesson-title" placeholder="Insérer titre"></input>
            </div>

            {/* <div className='form-add-lesson-add-pdf'>
                <input type="file" className="form-add-lesson-pdf" placeholder="Veuillez insérer un fichier pdf"></input>
                <p>*L'insertion de fichier est non-obligatoire, vous pouvez taper votre cours dans la section description</p>
            </div> */}

            <div className='form-add-lesson-add-details'>
                <div className='form-add-lesson-select-categorie'>
                  <select className="p-5px w-100 h-45px" style={{marginBottom: '20px', fontSize: 'Medium'}} onChange={(event) => {setPartsID(event.target.value)}} value={partsID}>
                    {parts.map((part) => (
                      <option key={part.id} value={part.id}>{part.id} : {part.name}</option>
                    ))}
                  </select>
                  <input value={duration} onChange={(event) => {setDuration(event.target.value)}} className="form-add-lesson-duration" placeholder="Temps à passer"></input><label>heure(s)</label>
                </div>
            </div>

            <div className='form-add-lesson-add-description'>
                <textarea value={description} onChange={(event) => {setDescription(event.target.value)}} className="form-add-lesson-description" placeholder="Description du cours"></textarea>
                <Link to="/cours"><button onClick={handleSubmit} type="submit" className="btn btn-form-add-lesson">Valider le cours</button></Link>
            </div>

        </form>
      </div>
    )
  }
  
export default AddLesson