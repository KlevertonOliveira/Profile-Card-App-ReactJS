import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const ProfileCard = () => {
  const [loading, setLoading] = useState(false)
  const [person, setPerson] = useState(null)
  const [subtitle, setSubtitle] = useState('random person')
  const [title, setTitle] = useState('name')

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      const currentPerson = data.results[0]
      const {
        email,
        login: { password },
        name: { first, last },
        phone,
        dob: { age },
        location: {
          street: { number, name },
        },
        picture: { large: photo },
      } = currentPerson

      const newPerson = {
        email,
        password,
        name: `${first} ${last}`,
        address: `${name}, ${number}`,
        phone,
        age,
        photo,
      }

      setPerson(newPerson)
      setSubtitle('name')
      setTitle(newPerson.name)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleInfo = (e) => {
    if (e.target.classList.contains('icon')) {
      const info = e.target.dataset.label
      setSubtitle(info)
      setTitle(person[info])
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <section className='profileCard'>
      <div className='blue-bg'></div>
      <div className='profile-img'>
        <img
          src={(person && person.photo) || ProfileCard.defaultProps.image}
          alt='Random user'
          className='profile-photo'
        />
      </div>
      <div className='profile-info'>
        <div className='person-info text-center'>
          <p>My {subtitle || ProfileCard.defaultProps.subtitle} is</p>
          <h3>{title || ProfileCard.defaultProps.title}</h3>
        </div>
        <div className='icons'>
          <button className='icon' data-label='name' onMouseOver={handleInfo}>
            <FaUser />
          </button>
          <button className='icon' data-label='email' onMouseOver={handleInfo}>
            <FaEnvelopeOpen />
          </button>
          <button className='icon' data-label='age' onMouseOver={handleInfo}>
            <FaCalendarTimes />
          </button>
          <button
            className='icon'
            data-label='address'
            onMouseOver={handleInfo}
          >
            <FaMap />
          </button>
          <button className='icon' data-label='phone' onMouseOver={handleInfo}>
            <FaPhone />
          </button>
          <button
            className='icon'
            data-label='password'
            onMouseOver={handleInfo}
          >
            <FaLock />
          </button>
        </div>
        <button type='button' className='action-btn' onClick={fetchProfile}>
          {loading ? 'Loading...' : 'Next Profile'}
        </button>
      </div>
    </section>
  )
}

ProfileCard.propTypes = {
  image: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

ProfileCard.defaultProps = {
  image: defaultImage,
  subtitle: 'default info',
  title: 'default value',
}

export default ProfileCard
