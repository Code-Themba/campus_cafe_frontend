import { useState } from 'react'
import { useSelector } from 'react-redux';
import PAYMENT_URL, { useMakePaymentMutation } from '../features/paymentSliceApi';
import axios from 'axios';

const PaymentButton = ({ cartItems }) => {
    const [message, setMessage] = useState('')
    const user = useSelector(state => state.auth);

    const handleMakePayMent = () => {
       axios.post('http://localhost:5300/api/create-checkout-session')
       .then(data => console.log(data))
       .catch(err => console.log(err))
    }
    return (
    <button onClick={() => handleMakePayMent()} className="bg-blue-500 text-white font-semibold text-lg text-center py-1 rounded-md w-full" to="#cart">Checkout</button>
  )
}

export default PaymentButton