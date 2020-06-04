export  const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENTS_LOADING':
            return {
                ...state,
                isLoading: true,
                isError: false
              };
        case 'GET_EVENTS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                events: [...state.events.slice(), ...action.payload.events],
                totalPages: action.payload.totalPages,
                page: action.payload.page
              };
        case 'GET_EVENTS_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
              };
        default:
          return state;
      }
};
