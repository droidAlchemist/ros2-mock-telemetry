import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Routing from "./routes/Routing";
import { Header, Footer } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Routing />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
