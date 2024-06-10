import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    isLoading: true,
    isSuccess: true,
    isFailed: false,
    itemDetails: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiCourseUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiCourseUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }

      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        itemDetails: updatedData,
      })
    } else {
      this.setState({
        isLoading: false,
        isSuccess: false,
        isFailed: true,
      })
    }
  }

  render() {
    const {isLoading, isSuccess, isFailed, itemDetails} = this.state
    const {imageUrl, description, name} = itemDetails

    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div className="spinner" data-testid="loader">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                arialLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}

          {isSuccess && (
            <div className="details-container">
              <div className="item-details">
                <img src={imageUrl} alt={name} className="course-image" />
                <div className="details">
                  <h1 className="course-heading">{name}</h1>
                  <p className="course-description">{description}</p>
                </div>
              </div>
            </div>
          )}
          {isFailed && (
            <div className="failed-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                alt="failure view"
                className="failure-image"
              />
              <h1 className="failure-heading">Oops! Something Went Wrong</h1>
              <p className="faliure-para">
                We cannot seem to find the page you are looking for
              </p>
              <button
                type="button"
                className="retry-button"
                onClick={this.getCourseDetails}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails
