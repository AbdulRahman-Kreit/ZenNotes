import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AllNotes from './components/AllNotes';
import Favorites from "./components/Favorites";
import Customizations from "./components/Customizations"
import AddNotes from './components/AddNotes';

import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";

import ThemeProvider from "./contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
        <Router>

          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<AllNotes />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/customizations" element={<Customizations />}></Route>
            </Route>

            <Route element={<MinimalLayout />}>
              <Route path="/add" element={<AddNotes />}></Route>
              <Route path="/edit/:id" element={<AddNotes />} />
            </Route>
          </Routes>
          
        </Router>
    </ThemeProvider>
  )
}

export default App
