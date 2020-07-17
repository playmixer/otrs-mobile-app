import { logout, signInError } from '../store/actions/user'

export default (dispatch) => (error) => {
  if (error?.status === 401) {
    dispatch(logout())
    dispatch(signInError())
  }    
};