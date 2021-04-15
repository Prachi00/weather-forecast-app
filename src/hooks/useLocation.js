import { useState, useEffect } from "react";
import { SET_LOADING } from "utils/constants";

const useLocation = (dispatch) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: { loading: true } });
    const onLocationReceived = (pos) => {
      setPosition(pos.coords);
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    };

    const onError = () => {
      /* setting default location in case current location couldn't be fetched */
      setPosition("vancouver");
      dispatch({ type: SET_LOADING, payload: { loading: false } });
    };

    const geo = navigator.geolocation;
    if (!geo) {
      onError();
      return;
    }
    geo.getCurrentPosition(onLocationReceived, onError, {
      timeout: 3000,
    });
  }, [dispatch]);

  return position;
};

export default useLocation;
