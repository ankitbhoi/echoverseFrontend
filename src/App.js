import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navigation from './Components/Shared/Navigation/Navigation'
import Authenticate from './pages/Authenticate/Authenticate'
import Activate from './pages/Activate/Activate'
import Rooms from './pages/Rooms/Rooms'
import { useSelector } from 'react-redux'
import Loader from './Components/Shared/Loader/Loader'
import { useLoading } from './hooks/useLoading'
import Room from './pages/Room/Room'

const App = () => {
    const { loading } = useLoading()
    return loading ? (
        <Loader message="Loading..." />
    ) : (
        <Router>
            <Navigation />
            <Routes>
                <Route
                    exact
                    draggable
                    path="/"
                    element={
                        <GuestRoute>
                            <Home />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/authenticate"
                    element={
                        <GuestRoute>
                            <Authenticate />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/activate"
                    element={
                        <SemiProtectedRoute>
                            <Activate />
                        </SemiProtectedRoute>
                    }
                />
                <Route
                    path="/rooms"
                    element={
                        <ProtectedRoute>
                            <Rooms />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/room/:id"
                    element={
                        <ProtectedRoute>
                            <Room />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

const GuestRoute = ({ children }) => {
    const { isAuth, user } = useSelector((state) => state.auth)
    const location = useLocation()
    return !isAuth ? (
        children
    ) : isAuth && !user.activated ? (
        <Navigate to="/activate" state={{ from: location }} />
    ) : (
        <Navigate to="/rooms" state={{ from: location }} />
    )
}

const SemiProtectedRoute = ({ children }) => {
    const { isAuth, user } = useSelector((state) => state.auth)
    const location = useLocation()
    return !isAuth ? (
        <Navigate to="/authenticate" state={{ from: location }} />
    ) : isAuth && !user.activated ? (
        children
    ) : (
        <Navigate to="/rooms" state={{ from: location }} />
    )
}

const ProtectedRoute = ({ children }) => {
    const { isAuth, user } = useSelector((state) => state.auth)
    const location = useLocation()
    return !isAuth ? (
        <Navigate to="/authenticate" state={{ from: location }} />
    ) : isAuth && !user.activated ? (
        <Navigate to="/activate" state={{ from: location }} />
    ) : (
        children
    )
}

export default App
