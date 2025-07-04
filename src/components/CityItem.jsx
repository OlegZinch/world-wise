import { Link } from 'react-router'
import styles from './CityItem.module.css'
import { useCities } from '../hooks/useCities'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city
  const isActive = id === currentCity.id

  function handleClick(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          isActive ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
