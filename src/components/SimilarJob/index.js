import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJob = props => {
  const {similarJobs} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobs
  return (
    <li className="similar-job-card">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="title-rating-container">
          <h1 className="title">{title}</h1>
          <div className="icon-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="description-heading">Description</h1>

      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJob
