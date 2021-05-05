

export default function userReducer(
  state = {
    user: undefined,
    userSuccess: false,
    userError: null
  },
  action: any
) {
  switch (action.type) {
    case 'temp':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}