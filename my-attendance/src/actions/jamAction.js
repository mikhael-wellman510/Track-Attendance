import axios from "axios";

export const GET_JAM = "GET_JAM";

export const getJam = (data) => {
  console.log("masuk action", data);
  return (dispatch) => {
    //dispatch
    dispatch({
      type: GET_JAM,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: "http://localhost:2000/attendancelog/today",
      params: {
        user_id: data.user_id,
      },
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        console.log("berhasil get API", response.data);
        dispatch({
          type: GET_JAM,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // gagal dapat API
        dispatch({
          type: GET_JAM,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
