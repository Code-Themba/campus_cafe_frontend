import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';
import { getTotals } from '../features/cartSlice';
import { useLogoutMutation } from '../features/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GiShoppingCart}  from 'react-icons/gi'
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const [logout] = useLogoutMutation();


  useEffect(() => {
    if (userData) { navigate('/'); }
  }, [ navigate, userData])

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  const logoutHandler = async() => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
   }

  return (
      <header className="pt-8 pb-3 px-8 flex justify-between border shadow-sm shadow-slate-400 bg-white">
          <div className="logo">
              <Link className="text-3xl font-bold hover:text-slate-600" to='/'>Campus Café</Link>
      </div>
      {userData ? (
        <>
          <ul className="pr-4 font-bold text-xl flex justify-between">
            <Link className="pr-3 hover:text-slate-600" to="#">{userData.firstName}</Link>
            <Link className="pr-3 hover:text-slate-600" onClick={ () => logoutHandler() }>Logout</Link>
            <Link className="pr-3 text-2xl hover:text-slate-600 flex relative" to="/cart"><GiShoppingCart /><span className="font-semibold text-lg absolute left-6 bottom-5 bg-stone-900 text-white rounded-full px-2.5">{cart.qty}</span></Link>
          </ul>
       </>
      ) : (
        
        <ul className="pr-4 font-bold text-xl  flex justify-between items-center">
            <Link className="pr-3 hover:text-slate-600" to='/login'>Log In</Link>
            <Link className="pr-3 hover:text-slate-600" to='/register'>Register</Link>
            <Link className="pr-3 text-2xl hover:text-slate-600 flex relative" to="/cart"><GiShoppingCart /><span className="font-semibold text-lg absolute left-6 bottom-5 bg-stone-900 text-white rounded-full px-2.5">{cart.qty}</span></Link>
            
        </ul>
      ) }
          
    </header>
  )
}


export default Header