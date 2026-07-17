import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    profileData: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,

    searchInput: '',
    employmentType: [],
    minimumPackage: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const {searchInput, minimumPackage, employmentType} = this.state

    const employment = employmentType.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedJobsList = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-job">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSection = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderJobsLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }

    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div className="job-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-view-image"
      />
      <h1 className="oops-text">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSection = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoader()
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()

      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state

    if (event.target.checked) {
      this.setState(
        {employmentType: [...employmentType, event.target.value]},
        this.getJobsList,
      )
    } else {
      this.setState(
        {
          employmentType: employmentType.filter(
            each => each !== event.target.value,
          ),
        },
        this.getJobsList,
      )
    }
  }

  onChangeMinimumPackage = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobsList)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filters-section">
            <div className="search-container mobile-search">
              <input
                type="search"
                className="jobs-search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderProfileSection()}
            <hr className="separator" />

            <div className="employment-type-container">
              <h1 className="employment-type">Type of Employment</h1>
              <ul className="employment-list">
                <li className="employment-item">
                  <input
                    type="checkbox"
                    id="fulltime"
                    value="FULLTIME"
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor="fulltime">Full Time</label>
                </li>
                <li className="employment-item">
                  <input
                    type="checkbox"
                    id="parttime"
                    value="PARTTIME"
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor="parttime">Part Time</label>
                </li>
                <li className="employment-item">
                  <input
                    type="checkbox"
                    id="freelance"
                    value="FREELANCE"
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor="freelance">Freelance</label>
                </li>
                <li className="employment-item">
                  <input
                    type="checkbox"
                    id="internship"
                    value="INTERNSHIP"
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor="internship">Internship</label>
                </li>
              </ul>
            </div>
            <hr className="separator" />

            <div className="salary-container">
              <h1 className="employment-type">Salary Range</h1>
              <ul className="employment-list">
                <li className="employment-item">
                  <input
                    type="radio"
                    id="10lpa"
                    name="salary"
                    value="1000000"
                    onChange={this.onChangeMinimumPackage}
                  />
                  <label htmlFor="10lpa">10 LPA and above</label>
                </li>
                <li className="employment-item">
                  <input
                    type="radio"
                    id="20lpa"
                    name="salary"
                    value="2000000"
                    onChange={this.onChangeMinimumPackage}
                  />
                  <label htmlFor="20lpa">20 LPA and above</label>
                </li>
                <li className="employment-item">
                  <input
                    type="radio"
                    id="30lpa"
                    name="salary"
                    value="3000000"
                    onChange={this.onChangeMinimumPackage}
                  />
                  <label htmlFor="30lpa">30 LPA and above</label>
                </li>
                <li className="employment-item">
                  <input
                    type="radio"
                    id="40lpa"
                    name="salary"
                    value="4000000"
                    onChange={this.onChangeMinimumPackage}
                  />
                  <label htmlFor="40lpa">40 LPA and above</label>
                </li>
              </ul>
            </div>
            <hr className="separator" />
          </div>
          <div className="jobs-section">
            <div className="search-container desktop-search">
              <input
                type="search"
                className="jobs-search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />

              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
