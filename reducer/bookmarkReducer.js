//Initial State
const initialState = {
  bookmark: [],
};
const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD': {
      return {bookmark: state.bookmark.concat(action.data)};
    }
    default: {
      return state;
    }
  }
};

export default bookmarkReducer;
