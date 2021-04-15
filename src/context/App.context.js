import { useReducer, createContext } from "react";
import {
	CHANGE_CITY,
	DATA_FETCH_FULFILLED,
	DATA_FETCH_REJECTED,
	SET_LOADING,
	AUTOCOMPLETE_DATA,
} from "utils/constants";

const initialState = { location: "", forecast: [], citiesSearches: [], status: "success", loading: false };

const AppContext = createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
		case CHANGE_CITY:
			return {
				...state,
				...action.payload,
			};
		case DATA_FETCH_FULFILLED: {
			return {
				...state,
				...action.payload,
				status: "success",
			};
		}
		case DATA_FETCH_REJECTED: {
			return {
				...state,
				status: "failed",
			};
		}
		case AUTOCOMPLETE_DATA: {
			return {
				...state,
				...action.payload
			}
		}

		default:
			return state;
	}
};

function AppProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
	);
}
export { AppContext, AppProvider };
