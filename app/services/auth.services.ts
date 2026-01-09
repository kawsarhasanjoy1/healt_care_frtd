import { authKey } from "../constance/authKey";
import { decodedToken } from "../utils/decodoeToken";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../utils/locat-storage";




export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    
   return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
   const authToken = getFromLocalStorage(authKey);
   if (authToken) {
      const decodedData: any = decodedToken(authToken);
      return {
         ...decodedData,
         role: decodedData?.role?.toLowerCase(),
      };
   } else {
      return '';
   }
};

export const isLoggedIn = () => {
   const authToken = getFromLocalStorage(authKey);
   if (authToken) {
      return !!authToken;
   }
};

export const removeUser = () => {
   return removeFromLocalStorage(authKey);
};

