import AppRouter from "../src/router/Router";
import AuthContextProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
};
export default App;
