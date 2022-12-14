import ReactDOM from "react-dom/client";
import { store } from "./store/configureStore";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
