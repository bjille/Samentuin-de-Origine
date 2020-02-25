const initialstate = [];
function kalenderReducer(state = initialstate, action) {
  const { payload, type } = action;
  console.log(type);
  switch (type) {
    case "SET_KALENDERDATA":
      return payload;
    default:
      return state;
  }
}

export default kalenderReducer;
