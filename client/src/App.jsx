import TextEditor from "./Components/TextEditor"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/documents/${uuidV4()}`} replace />}
          />

          <Route
            path="/documents/:id"
            element={<TextEditor />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
