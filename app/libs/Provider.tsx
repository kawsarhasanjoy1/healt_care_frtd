'use client'
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store,persistor } from "../redux/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider = ({children}: {children: ReactNode
}) => {
return (
    <Provider store={store}>
       <PersistGate persistor={persistor}> 
         {children}
         <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            style: {
              fontSize: "14px",
            },
          }}
        />
       </PersistGate>
    </Provider>
)
}

export default ReduxProvider