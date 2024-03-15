import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterMutation } from '../features/userApiSlice';
import { loginUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.auth);

  const [register] = useRegisterMutation();
  
  useEffect(() => {
    if (userData) {
      navigate('/')
    }
  },[navigate, userData])
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      console.log('Passwords must match')
    } else {
      const res = await register({ firstName, lastName, email, password }).unwrap();
      dispatch(loginUser({ ...res }));
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='m-5 mx-auto pt-3 rounded-md px-8 sm:w-3/5 border border-slate-400'>
        <h1 className='mb-4 text-4xl text-center font-bold'>Register</h1>
        <div className="py-1 mb-1 flex justify-center">
              <Link className="p-2 w-3/4 border border-slate-400 rounded-md bg-slate-200 hover:bg-slate-100 flex justify-center text-center text-lg font-bold" to="#"><FcGoogle className="mt-1 mr-1" />Register With Google</Link>
          </div>
          <div className="flex justify-center"> 
            <p className='font-bold uppercase p-1'>or</p>
          </div>
          <div className="form-group p-1">
            <label className="block font-semibold text-xl" htmlFor="firstname">First name</label>
          <input autocomplete="off" type="text"
            name="firstname" id="firstname" className="p-2 border border-slate-600 rounded w-full text-start"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Enter first name...' />
        </div>
        <div className="form-group p-1">
            <label className="block font-semibold text-xl" htmlFor="lastname">Last name</label>
          <input autocomplete="off" type="text" name="lastname" id="lastname" className="p-2 border border-slate-600 rounded w-full text-start"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Enter last name...' />
        </div>
        <div className="form-group p-1">
            <label className="block font-semibold text-xl" htmlFor="email">Email Address</label>
          <input autocomplete="off" type="email" name="email" id="email" className="p-2 border border-slate-600 rounded w-full text-start"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email Address...' />
        </div>
          <div className="form-group p-1 mb-2">
            <label className="block font-semibold text-xl" htmlFor="password">Password</label>
          <input autocomplete="off" type="password" name="password" id="password" className="p-2 border border-slate-600 focus-visible:border-slate-400 rounded w-full text-start"
            value={password}
            onChange={(e) => setPassword(e.target.value)}placeholder='Enter Password...' />
          </div>
          <div className="form-group p-1 mb-2">
            <label className="block font-semibold text-xl" htmlFor="confirm_password">Confirm Password</label>
          <input autocomplete="off" type="password" name="confirm_password" id="confirm_password" className="p-2 border border-slate-600 focus-visible:border-slate-400 rounded w-full text-start"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password...' />
          </div>
          <div className="form-group p-2">
              <button type='submit' className="rounded-md py-2 px-5 font-bold bg-blue-700 text-white hover:bg-blue-500">Register</button>
          </div>

          <p className='p-2'>Already have an account? <Link className='text-blue-800 underline' to='/login'>login</Link></p>
          
          
      </form>
  )
}

export default RegistrationPage