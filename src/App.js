import {
  BrowserRouter as Router,
  Switch,
  Route,
	useHistory,
	useLocation
} from "react-router-dom";
import './App.css';
import { PrivateRoute } from "./components/PrivateRoute";
import { ProvideAuth, useAuth } from "./components/ProvideAuth";

function App() {
	return (
		<ProvideAuth>
			<Router>
				<div>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/dashboard">
							<Dashboard />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<PrivateRoute path="/private">
							<ProtectedPage />
						</PrivateRoute>
					</Switch>
				</div>
    	</Router>
		</ProvideAuth>
	)
}

export default App;

const Home = () => <diV>Home</diV>;
const About = () => <div>About</div>;
const Dashboard = () => <div>Dashboard</div>;
const ProtectedPage = () => {
	const auth = useAuth();
	const history = useHistory();
	return <button onClick={() => {auth.signout(() => history.push("/"))}}>Logout</button>;
		// (
		// 	<div>
				
		// 		{/* <button onClick={() => {auth.signout()}}">Logout</button> */}
		// 	</div>
		// );
}

const LoginPage  = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}