import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store.jsx"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
)
