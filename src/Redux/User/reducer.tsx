import * as ActionTypes from './constant';

const initialState = {
  loading: false,
  total: 0,
  payload: [],
  searchList: [],
  noti: false,
  error: false,
  message: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.REQUEST:
      return {...state, loading: true};
    case 'RESET_MODULE':
      state = initialState;
      return {...state};
    case ActionTypes.GET_USER:
      state.total = action.total;
      state.searchList = action.searchList;
      if (action.keyword !== '' && state.payload.length < 7) {
        return {
          payload: [],
          searchList: action.searchList,
        };
      }
      return {
        ...state,
        loading: false,
        payload: [...state.payload, ...action.payload],
      };
    case ActionTypes.POST_USER:
      return {
        ...state,
        loading: false,
        payload: [action.payload, ...state.payload],
      };
    case ActionTypes.ERROR:
      state.message = action.message;
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ActionTypes.PUT_USER:
      const newPayload = state.payload.map((user: any, index: number) => {
        if (user.username === action.payload.username) {
          return {
            ...user,
            fullname: action.payload.fullname,
            username: action.payload.username,
            email: action.payload.email,
          };
        }
        return user;
      });
      return {
        ...state,
        payload: newPayload,
        loading: false,
      };
    case ActionTypes.DELETE_USER:
      let position = -1;
      state.payload.map((user: any, index: number) => {
        if (user.username === action.username) {
          position = index;
        }
        return position;
      });
      state.payload.splice(position, 1);
      state.message = action.message;
      return {
        ...state,
        loading: false,
        noti: action.noti,
      };
    default:
      return {...state, loading: false};
  }
};

export default userReducer;