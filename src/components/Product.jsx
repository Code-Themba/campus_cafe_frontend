import React from 'react'

const Product = ({ product }) => {
	return (
		<div>
			<img src={product.image} alt={product.name}/>
		</div>
	)
}

export default Product