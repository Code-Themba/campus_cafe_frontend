import { useGetAllProductsQuery } from '../features/productApiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const HomePage = () => {
	const { data, isLoading, error, isSuccess } = useGetAllProductsQuery();
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product))
	}

	return (
		<>
			{isLoading && <h2>Loading...</h2>}
			{error && <h2>Something went wrong...</h2>}
			{isSuccess && (
				<div className='relative grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6 px-8 w-full'>
					{data?.products?.map(product =>
						<div key={product._id}>
						{/* {setProduct(product)} */}
						<div className=' bg-white mb-1 h-[350px] w-[250px] rounded-xl shadow-2xl hover:scale-100 relative'>
							<img className='w-full h-40 object-fill' src={product.image} alt={product.name} />
							<div className="details p-3">
								<p className='px-1 py-2 mb-9 font-bold text-lg'>
									{product.name}
								</p>
								<p className="absolute right-0 top-0 p-1 bg-black rounded-md text-white font-semibold">R{' '}{ product.price}</p>
							</div>
							<div className='mt-3 p-4 absolute bottom-0 m-auto'>
									<button onClick={() => handleAddToCart(product) } className='bg-blue-600 text-white font-semibold px-6 py-2 rounded-3xl hover:scale-95'>Add To Cart</button>
							</div>
						</div >
						</div>
						)}
				</div>
			)}
		</>		
	)
}

export default HomePage