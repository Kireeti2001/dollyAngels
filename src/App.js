import React from "react";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div>
      <LandingPage />
      {/* Use Switch for v5, Routes for v6+ */}
      {/* <Switch> */}
      {/* <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes> */}
      {/* </Switch> */}
      <main>{/* Content will be rendered here based on routing */}</main>
    </div>
  );
}

export default App;
