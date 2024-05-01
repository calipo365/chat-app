import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Users from "./components/Users";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Conversation from './components/Conversation';
import Conversations from './components/Conversations';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/:id" element={<User/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/conversations" element={<Conversations/>}/>
            <Route path="/conversations/:id" element={<Conversation/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;