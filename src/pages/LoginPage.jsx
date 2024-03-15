import { useEffect, useState } from 'react';
import { useLoginMutation } from '../features/userApiSlice';
import { loginUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(state => state.auth);
  
  const [login] = useLoginMutation();

  useEffect(() => { 
    if (userData) {
      navigate('/')
    }
  }, [navigate, userData])

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(loginUser({ ...res }));
      navigate('/');     
    } catch (err) {
      // console.log(err?.data?.message || err.error)
      console.log(err.error)
    }

  }

  return (
      <form onSubmit={submitHandler} className='mt-5 mx-auto pt-3 rounded-md px-8 sm:w-2/3 md:1/3 w-2/3 border border-slate-400'>
        <h1 className='mb-4 text-4xl text-center font-bold'>Login</h1>
          <div className="form-group p-2">
            <label className="block font-semibold text-xl" htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-slate-600 rounded w-full text-start" placeholder='Enter Email Address...' />
        </div>
          <div className="form-group p-2 mb-2">
            <label className="block font-semibold text-xl" htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-slate-600 focus-visible:border-slate-400 rounded w-full text-start" placeholder='Enter Password...' />
          </div>
          <div className="form-group p-2">
              <button className="rounded-md py-2 px-5 font-bold bg-blue-700 text-white hover:bg-blue-500">Login</button>
          </div>

          <p className='p-2'>No account yet? <Link className='text-blue-800 underline' to='/register'>register</Link></p>
          <div className="flex justify-center"> 
            <p className='font-bold uppercase p-1'>or</p>
          </div>
          <div className="py-3 mb-1 flex justify-center">
              <Link className="p-2 w-3/4 border border-slate-400 rounded-md bg-slate-200 hover:bg-slate-100 flex justify-center text-center text-lg font-bold" to="#"><FcGoogle className="mt-1 mr-1" />Log In With Google</Link>
          </div>
      </form>
  )
}

export default LoginPage