import logo from './logo.svg';
import './App.css';
import ResumeTemplates from './Components/ResumeTemplates';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResumeEdit from './Components/ResumeEdit';

function App() {
  return (
    <div className="App">
      {/* <ResumeTemplates/> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResumeTemplates />} />
        <Route path="/createResume" element={<ResumeEdit />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
