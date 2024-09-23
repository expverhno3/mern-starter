import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    // values for light mode and dark mode
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* --- nav bar */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      {/* --- main content */}
    </Box>
  );
}

export default App;
