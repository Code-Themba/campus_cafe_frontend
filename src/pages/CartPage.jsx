import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa'; 
import { clearCart, decrementCartQTY, getTotals ,incrementCartQTY,removeFromCart } from '../features/cartSlice';
import PaymentButton from '../components/PaymentButton';

const Cart = () => {

  const { userData } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getTotals());
  }, [cart, dispatch])

  const handleRemoveFromCart = product => {
    dispatch(removeFromCart(product));
  }
  const incrementQTY = product => {
    dispatch(incrementCartQTY(product));
  }
  
  const decrementQTY = product => {
    if(product.cartQuantity < 1){
      dispatch(handleRemoveFromCart(product))
    } else {
      dispatch(decrementCartQTY(product));
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }


  return (
    <div className="">
      <h2 className=" text-4xl font-semibold">Your Cart</h2>
      {cart.items.length === 0 ? (
        <>
          <p className="py-3 px-2 text-2xl fonte">No Items</p>
          <Link className="font-semibold text-gray-700 hover:text-gray-500" to="/"><FaLongArrowAltLeft className="inline text-xl"/> Grab a few items</Link>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4 py-3 px-4">
            <h3 className="font-semibold text-lg flex-1">Products In Cart</h3>
            </div>
            <div className="cart px-4">
              {cart?.items.map(item =>
              (
                <div key={item._id}>
                  <div className="flex mb-2 py-2">
                    <img src={item.image} alt={item.name} className="pb-5 object-contain items-center w-36 h-36" />
                    <div className="px-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p>{item.description.substring(0, 15)}...<Link to="#cart">read more</Link></p>
                      <p>R{' '} {(item.price * item.cartQuantity).toFixed(2)}</p>
                      <div className="flex w-20 justify-center border border-gray-400 rounded-sm">
                        <button onClick={() => decrementQTY(item)} className="bg-slate-300 w-6 ">-</button>
                        <p className="w-10 text-center">{item.cartQuantity}</p>
                        <button onClick={() => incrementQTY(item)} className=" bg-slate-300 w-6">+</button>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </div>
                  </div>
              </div>
              ))}
              <div className="flex justify-between h-1/4 pb-8 pt-2 px-12 border border-t-2 border-t-slate-400 bg-white mb-4">
                <button onClick={() => { handleClearCart() }} className="bg-slate-200 p-3 h-12 rounded-md font-semibold">Clear Cart</button>
                <div className="cart-actions">
                  <div className="flex flex-col">
                    <div className="flex justify-between font-bold text-xl">
                    <h1>subtotal</h1>
                      <span>R {cart.totalPrice.toFixed(2)}</span>  
                  </div>
                  <small className="py-1 text-slate-400 font-bold">Taxes and shipping calculated at checkout</small>
                    {
                      userData ?
                        <PaymentButton cartItems={cart.items}/> :
                        <Link className="bg-blue-500 text-white font-semibold text-lg text-center py-1 rounded-md w-full" to="/login">Log In To Checkout</Link>
                      }
                    
                    <Link className="py-1 mb-2 text-slate-400 font-bold text-2xl" to="/"><FaLongArrowAltLeft className="inline text-3xl pr-1 pb-1"/>Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}
    </div>
  )
}

export default Cart