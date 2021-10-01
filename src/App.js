
import './App.css';
import Header from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import Notification from './pages/notification'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import { useEffect, useState } from 'react';

function App() {

  const [dash, setLocation] = useState(false);
  useEffect(() => {
    console.log(`Location is now ${window.location.href}`);
    const d = window.location.href.indexOf("dashboard") > -1 ? true : false;
    setLocation(d);
  },[]);
  
  return (
    <BrowserRouter>
      { dash ? '' : 
      <div className="App">
        <Header />
      </div>
      }
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/notification" component={Notification} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
