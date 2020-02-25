const initialstate = [];

function zaaikalenderReducer(state = initialstate, action) {
  switch (action.type) {
    case "GET_ZAAIKALENDER":
      return action.payload;
    default:
      return state;
  }
}

export default zaaikalenderReducer;
