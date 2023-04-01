import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/Lesson.css';

function SeeLessons() {

    const [lesson, setLesson] = useState(null);

    const { lessonsID } = useParams();

    useEffect(() => {
        fetch('http://localhost:8000/api/lessons/' + lessonsID, { method: 'GET' })
          .then(response => response.json())
          .then(data => {
            // filter the data to only include the lesson with the matching id
            const filteredData = data.find(lesson => lesson.id == lessonsID);
            setLesson(filteredData);
          })
    }, [lessonsID])

  return (
    <div>
        <div>
          <h2>{lesson.name}</h2>
          <p>{lesson.content}</p>
        </div>
    </div>
  )
}

export default SeeLessons;
