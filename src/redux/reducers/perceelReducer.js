const initialstate = { groenten: [] };

function perceelReducer(state = initialstate, action) {
  const { payload } = action;
  let newState = [];
  switch (action.type) {
    case "GET_PERCEELINFO":
      return { groenten: payload };
    case "SET_SELECTED_PERCEEL":
      return { ...state, selectedPerceel: payload };
    case "DELETE_ACTION_OVERZICHT":
      newState = state.groenten.filter(groente => groente._id !== payload);
      return { groenten: newState, selectedPerceel: state.selectedPerceel };
    case "ADD_ACTION_OVERVIEW":
      return {
        groenten: [...state.groenten, payload],
        selectedPerceel: state.selectedPerceel
      };
    case "EDIT_ACTION_OVERVIEW":
      newState = state.groenten.map(groente => {
        if (groente._id === payload._id) {
          groente = payload;
        }
        return groente;
      });
      return {
        groenten: [...newState],
        selectedPerceel: state.selectedPerceel
      };
    default:
      return state;
  }
}

export default perceelReducer;
