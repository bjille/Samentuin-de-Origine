const initialstate = { groenten: [] };

function perceelReducer(state = initialstate, action) {
  const { payload } = action;
  switch (action.type) {
    case "GET_PERCEELINFO":
      return { groenten: payload };
    case "SET_SELECTED_PERCEEL":
      return { ...state, selectedPerceel: payload };
    case "DELETE_GROENTE_OVERZICHT":
      const newState = state.groenten.filter(
        groente => groente._id !== payload
      );
      return { groenten: newState, selectedPerceel: state.selectedPerceel };
    case "ADD_GROENTE_OVERVIEW":
      return {
        groenten: [...state.groenten, payload],
        selectedPerceel: state.selectedPerceel
      };
    default:
      return state;
  }
}

export default perceelReducer;
