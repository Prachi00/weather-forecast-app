import styles from "./CardDetail.module.scss";

const CardDetail = ({ data }) => {
  const getHour = (time) => new Date(time).getHours();

  const displayMoreInfo = (item, i) => {
    return (
      <div className={styles.hourly__info} key={i}>
        <div className={styles.hourly__temperature}>
          {`${Math.round(item.main.temp)}°C`}
        </div>
        <div className={styles["hourly__day-hours"]}>{`${getHour(
          item.dt_txt
        )}:00`}</div>
      </div>
    );
  };

  return (
    <div className={styles.hourly}>
      {data.slice(0, 5).map((item, i) => displayMoreInfo(item, i))}
    </div>
  );
};

export default CardDetail;
