import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        {/* Top-section */}

        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="icon-rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        {/* Location, Employment Type, Package */}

        <div className="location-package-container">
          <div className="location-employment-container">
            <div className="location-container">
              <MdLocationOn className="location-logo" />
              <p className="location-text">{location}</p>
            </div>
            <div className="employment-container">
              <BsBriefcaseFill className="location-logo" />
              <p className="location-text">{employmentType}</p>
            </div>
          </div>
          <p className="packageper-annum">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
