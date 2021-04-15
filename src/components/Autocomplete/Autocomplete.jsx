import styles from "./Autocomplete.module.scss";
import { useContext } from "react";
import { AppContext } from "context/App.context";
import { getIcon } from "utils/api";
import { AUTOCOMPLETE_DATA, CHANGE_CITY } from "utils/constants";

const Autocomplete = () => {
  const { state, dispatch } = useContext(AppContext);

  const updateCity = (item) => {
    if (state.location !== item.name) {
      // clear searches data
      dispatch({
        type: AUTOCOMPLETE_DATA,
        payload: {
          citiesSearches: [],
        },
      });
      // trigger city change
      dispatch({
        type: CHANGE_CITY,
        payload: {
          location: item.name,
        },
      });
    }
  };

  return (
    <div className={styles.search__dropdown}>
      {state.citiesSearches.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.search__dropdown__res}
            onClick={() => updateCity(item)}
          >
            <span>{item.name}</span>
            <div className={styles.search__dropdown__info}>
              <div className={styles.search__dropdown__info__temp}>
                <span>{item.temp}&#8451;</span>
                <span className={styles.search__dropdown__info__desc}>
                  {item.desc}
                </span>
              </div>
              <div>
                <img
                  className={styles.dashboard__forecast__image}
                  src={getIcon(item.icon)}
                  alt=""
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Autocomplete;
