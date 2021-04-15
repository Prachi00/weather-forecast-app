import axios from "axios";
import {
  APP_ID,
  DATA_FETCH_FULFILLED,
  DATA_FETCH_REJECTED,
  SET_LOADING,
} from "utils/constants";

export const fetchLocationData = (region, dispatch) => {
  const { latitude, longitude } = region || {};

  const getDataByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${region}&units=metric&appid=${APP_ID}`;
  const getDataByCoords = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`;

  let location = typeof region === "object" ? getDataByCoords : getDataByCity;

  dispatch({ type: SET_LOADING, payload: { loading: true } });

  /* api hit */
  return axios
    .get(location)
    .then((response) => {
      dispatch({
        type: DATA_FETCH_FULFILLED,
        payload: {
          forecast: response.data.list,
          location: response.data.city.name.toLowerCase(),
        },
      });
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    })
    .catch((err) => {
      dispatch({ type: SET_LOADING, payload: { loading: false } });
      dispatch({ type: DATA_FETCH_REJECTED, payload: err }); // Error handling
    });
};

/* fetching the wetaher icons */
export const getIcon = (icon) => `https://openweathermap.org/img/w/${icon}.png`;

/* autocmplete api */
export const getSearchResults = (value) => {
  const weatherApi = `https://api.openweathermap.org/data/2.5/find?q=${value}&cnt=10&units=metric&appid=${APP_ID}`;
   return axios
  .get(weatherApi)
  .then((response) => {
    let searchData = [];
    for (const item of response.data.list) {
      searchData.push({
        lat: item.coord.lat,
        lon: item.coord.lon,
        name: item.name,
        temp: Math.ceil(item.main.temp),
        icon: item.weather[0].icon,
        desc: item.weather[0].main,
      });
    }
    return searchData;
  })
  .catch((err) => {
    // dispatch({ type: SET_LOADING, payload: { loading: false } });
    // dispatch({ type: DATA_FETCH_REJECTED, payload: err }); // Error handling
  });
};
