import {Component} from 'react'
import TailSpin from 'react-loader-spinner'

import Header from '../Header'
import Course from '../Course'

import './index.css'

class Home extends Component {
  state = {
    courseList: [],
    isLoading: true,
    isSuccess: true,
    isFailed: false,
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const apiUrl = `https://apis.ccbp.in/te/courses`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))

      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        courseList: updatedData,
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
    const {isLoading, isSuccess, isFailed, courseList} = this.state
    return (
      <div>
        <Header />
        <div className="spinner">
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
            <div className="course-container">
              <h1 className="heading">Courses</h1>
              <ul className="course-list">
                {courseList.map(eachItem => (
                  <Course key={eachItem.id} details={eachItem} />
                ))}
              </ul>
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
                onClick={this.getCourses}
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

export default Home
