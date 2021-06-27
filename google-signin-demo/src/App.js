import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Layout from './components/Layout'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

