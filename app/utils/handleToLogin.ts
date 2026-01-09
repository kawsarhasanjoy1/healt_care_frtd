
import { setUser } from "../redux/api/fetures/auth";
import { AppDispatch } from "../redux/store";
import { decodedToken } from "./decodoeToken";



export const handleLoginSuccess = (dispatch: AppDispatch, token: string) => {
  const user = decodedToken(token) as any;
  dispatch(setUser({ user, token }));
};
