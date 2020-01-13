const UPDATE = "PEOPLE_UPDATE";

const defaultState = {
  list: []
};
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return { ...state, list: [...action.payload] };
    default:
      return state;
  }
}

export function updatePeopleAction(payload) {
  return { type: UPDATE, payload };
}
