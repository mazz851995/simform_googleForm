import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import Error from './components/Error';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormMain from './components/FormMain';
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "GET_FORMS" })
  }, [])

  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/form/:slug" component={() => <FormMain />} />
          <Route exact path="/create-form" component={() => <Form />} />
          <Route component={() => <Error />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
