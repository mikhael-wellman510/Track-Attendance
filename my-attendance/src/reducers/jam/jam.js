import { GET_JAM } from "../../actions/jamAction";

const initialState = {
  getJamResult: false,
  getJamLoading: false,
  getJamData: false,
};

const jam = (state = initialState, action) => {
  switch (action.type) {
    case GET_JAM:
      console.log("4.masuk ke reducer", action);
      return {
        ...state,
        getJamResult: action.payload.data,
        getJamLoading: action.payload.loading,
        getjamData: action.payload.data,
      };
    default:
      return state;
  }
};

export default jam;
