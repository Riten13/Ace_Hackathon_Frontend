import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, NotFound } from "./pages";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div className="min-h-screen font-f1 flex flex-col dark:bg-darkbg dark:text-darkmodetext">
      <BrowserRouter>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
