import { useContext } from "react";
import { AppContext } from "context/App.context";
import CardDetail from "components/CardDetail/CardDetail";
import styles from "./ForecastCards.module.scss";
import { getIcon } from "utils/api";

const ForecastCards = () => {
  const { state } = useContext(AppContext);
  const groupByDays = (data) => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      item.date = forecastDate;
      list[forecastDate].push(item);

      return list;
    }, {});
  };

  const getDayInfo = (data) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return daysOfWeek[new Date(data[0].date).getDay()];
  };

  // /* fetching the icon for weather */
  // const getIcon = (data) =>
  //   `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  /* minimum, max, avg */
  const getInfo = (data, min = [], max = [], humidity = []) => {
    data.forEach((item) => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(
      humidity.reduce((curr, next) => curr + next) / humidity.length
    );

    return (
      <div className={styles.cards__weather}>
        <div className={styles.cards__weather__text}>
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div
          className={styles["cards__weather__more-text"]}
        >{`Avg. Humidity: ${avgHumdity}%`}</div>
      </div>
    );
  };

  /* toggle accordion */
  const showMoreInfo = (index) => {
    const el = document.querySelector(`.more${index}`);
    if (el) {
      if (el.classList.contains(styles.expanded)) {
        el.classList.remove(styles.expanded);
      } else {
        el.classList.add(styles.expanded);
      }
    }
  };

  const forecasts = state.forecast;
  const tiles = Object.values(groupByDays(forecasts));

  /* show only 5 days forecast */
  const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

  return (
    <div className={styles.cards}>
      {forecastTiles.map((item, i) => (
        <div
          className={styles.cards__tile}
          key={i}
          onClick={() => showMoreInfo(i)}
        >
          <div className={styles.cards__info}>
            <div className={styles.cards__icon}>
              <img src={getIcon(item[0].weather[0].icon)} alt="weather-icon" />
              {getDayInfo(item)}
            </div>
            {getInfo(item)}
          </div>
          <div className={`${styles.cards__detailed} more${i}`}>
            <CardDetail data={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
