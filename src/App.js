import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loginscreen from "./screen/Loginscreen";
import PdfViewer from "./screen/DocViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginscreen />} />
        <Route path="/pdf-viewer" element={<PdfViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
