const initialstate = { groenten: [] };

function perceelReducer(state = initialstate, action) {
  const { payload } = action;
  let newState = [];
  switch (action.type) {
    case "GET_PERCEELINFO":
      return { groenten: payload, selectedPerceel: state.selectedPerceel };
    case "SET_SELECTED_PERCEEL":
      return { ...state, selectedPerceel: payload };
    case "RESET_SELECTED_PERCEEL":
      return { groenten: state.groenten };
    case "DELETE_ACTION_OVERZICHT":
      if (payload.linkedId) {
        newState = state.groenten.filter(groente => {
          groente.childActions = groente.childActions.filter(
            childGroente => childGroente._id !== payload._id
          );
          return groente;
        });
      } else {
        newState = state.groenten.filter(
          groente => groente._id !== payload._id
        );
      }

      return { groenten: newState, selectedPerceel: state.selectedPerceel };
    case "ADD_ACTION_OVERVIEW":
      if (payload.linkedId) {
        newState = state.groenten.map(groente => {
          if (groente._id === payload.linkedId) {
            groente.childActions.push(payload);
            return groente;
          } else return groente;
        });
      } else {
        newState = [...state.groenten, payload];
      }
      return {
        // groenten: [...state.groenten, payload],
        groenten: newState,
        selectedPerceel: state.selectedPerceel
      };
    case "EDIT_ACTION_OVERVIEW":
      console.log(payload);
      if (!payload.linkedId) {
        //Als er geen linkedId is, maw: is GEEN childaction:
        newState = state.groenten.map(groente => {
          if (groente._id === payload._id) {
            groente = payload;
          }
          return groente;
        });
      } else {
        //Als er een linkedid is, maw: is EEN childaction:
        newState = state.groenten.map(groente => {
          if (groente._id === payload.linkedId) {
            //als de groente ID van de mastergroente gelijk is aan de linkedID van de childaction
            groente.childActions = groente.childActions.map(childAction => {
              // Als de childaction ID gelijk is aan de payload ID (dan is het de geselecteerde childaction)
              if (childAction._id === payload._id) {
                childAction = payload;
              }
              return childAction;
            });
          }
          return groente;
        });
      }
      return {
        groenten: [...newState],
        selectedPerceel: state.selectedPerceel
      };
    default:
      return state;
  }
}

export default perceelReducer;
