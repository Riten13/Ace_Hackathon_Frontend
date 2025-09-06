import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthAction,
  EditProfile,
  EmotionalCoach,
  EQTest,
  ForgotPassword,
  Landing,
  Login,
  NoteEditor,
  Notes,
  NotFound,
  Onboarding,
  Profile,
  Signout,
  Signup,
} from "./pages";
import { Footer, Navbar } from "./components";
import Protector from "./components/Protector";
import BreathingExercise from "./components/BoxBreathing";

function App() {
  return (
    <div className="min-h-screen font-f1 flex flex-col dark:bg-darkbg dark:text-darkmodetext">
      <BrowserRouter>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth-action" element={<AuthAction />} />
            <Route path="/auth-action" element={<AuthAction />} />
            <Route path="/auth-action" element={<AuthAction />} />
            <Route path="/eq-assessment" element={<EQTest />} />

            <Route path="/breathing" element={<BreathingExercise />} />

            {/* Protected routes - Logged In User required. */}

            <Route
              path="/edit-profile"
              element={
                <Protector>
                  <EditProfile />
                </Protector>
              }
            />

            {/* View your profile */}
            <Route
              path="/profile"
              element={
                <Protector>
                  <Profile />
                </Protector>
              }
            />

            <Route
              path="/wellness-ai"
              element={
                <Protector>
                  <EmotionalCoach />
                </Protector>
              }
            />

            {/* View all your notes */}
            <Route
              path="/notes"
              element={
                <Protector>
                  <Notes />
                </Protector>
              }
            />

            {/* Displays a note (Allows to edit if you're the note owner) */}
            <Route
              path="/notes/:noteId"
              element={
                <Protector>
                  <NoteEditor />
                </Protector>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
