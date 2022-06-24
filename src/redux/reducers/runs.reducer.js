const runReducer = (state = [], action) => {
  console.log("run reducer: ", action.payload);
    switch (action.type) {
      case 'SET_RUNS':
          console.log("run reducer: ", action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default runReducer;
  