import {Link} from 'react-router-dom'

import './index.css'

const Course = props => {
  const {details} = props
  const {id, logoUrl, name} = details

  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="list-item">
        <div className="course-details">
          <img src={logoUrl} alt={name} className="logo" />
          <p className="name-para">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default Course
