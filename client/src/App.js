import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import NotFound from './components/NotFound'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default App;
