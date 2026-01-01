import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from './components/Overview';
import AddNotes from './components/AddNotes';
import ThemeProvider from "./contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <main className="px-16 w-full mx-auto duration-500">
        <Router>
          <Routes>
            <Route path="/" element={<Overview />}></Route>
            <Route path="/add" element={<AddNotes />}></Route>
            <Route path="/edit/:id" element={<AddNotes />} />
          </Routes>
        </Router>
      </main>
    </ThemeProvider>
    
  )
}

export default App
