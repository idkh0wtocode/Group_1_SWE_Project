// src/pages/MarketplacePage.jsx
import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"

export default function Products() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		// Fetch products from Django backend
		fetch("http://localhost:8000/api/products/")
			.then((res) => res.json())
			.then((data) => setProducts(data))
	}, [])

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Marketplace</h1>
			<ProductList products={products} />
		</div>
	)
}
