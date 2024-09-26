import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import AllPost from './pages/AllPost';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FavoritePosts from './pages/FavoritePosts';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allPost" element={<AllPost />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/resetPassword/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<FavoritePosts />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
