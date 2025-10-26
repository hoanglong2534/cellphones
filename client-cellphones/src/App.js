import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import ResetScroll from './components/ResetScroll/ResetScroll';
import MyOrderPage from './pages/MyOrderPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import StoresPage from './pages/StoresPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPolicyPage from './pages/PaymentPolicyPage';
import VoucherPage from './pages/VoucherPage';
import ReturnPage from './pages/ReturnPage';
import GlobalAIChatbot from './components/GlobalAIChatbot/GlobalAIChatbot';

function App() {
  return (
    <div className="App">
  
      <Router>
        
        <ResetScroll></ResetScroll>

        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>

        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/register">
          <SignupPage></SignupPage>
        </Route>

        <Route path="/product">
          <ProductPage></ProductPage>
        </Route>
        <Route path="/detail/:id">
          <DetailPage></DetailPage>
        </Route>

        <Route path='/cart'>
          <CartPage></CartPage>
        </Route>

        <Route path='/order'>
          <OrderPage></OrderPage>
        </Route>
        <Route path='/orderSuccess'>
          <OrderSuccessPage></OrderSuccessPage>
        </Route>
        <Route path='/payment'>
          <PaymentPage></PaymentPage>
        </Route>
        <Route path='/MyOrder'>
          <MyOrderPage></MyOrderPage>
        </Route>

        <Route path='/search'>
          <SearchPage></SearchPage>
        </Route>

        <Route path='/chat'>
          <ChatPage></ChatPage>
        </Route>

        <Route path='/admin'>
          <AdminPage></AdminPage>
        </Route>

        {/* New Footer Pages */}
        <Route path='/about'>
          <AboutPage></AboutPage>
        </Route>
        <Route path='/blog'>
          <BlogPage></BlogPage>
        </Route>
        <Route path='/careers'>
          <CareersPage></CareersPage>
        </Route>
        <Route path='/stores'>
          <StoresPage></StoresPage>
        </Route>
        
        {/* Policy Pages */}
        <Route path='/shipping'>
          <ShippingPage></ShippingPage>
        </Route>
        <Route path='/payment'>
          <PaymentPolicyPage></PaymentPolicyPage>
        </Route>
        <Route path='/voucher'>
          <VoucherPage></VoucherPage>
        </Route>
        <Route path='/return'>
          <ReturnPage></ReturnPage>
        </Route>

            {/* <Route path='*'>
              <HomePage></HomePage>
            </Route> */}

          </Router>
          
          {/* Global AI Assistant - hiển thị trên mọi trang */}
          <GlobalAIChatbot />
        </div>
      );
    }

    export default App;
