import React from "react"
import { useEffect, useState } from "react"
import ProductList from "../components/ProductList"
import CreateProduct from "../components/CreateProduct"
import api from "../api"

const Account = () => {
	const [products, setProducts] = useState([])
	const [seller, setSeller] = useState("")

	// get current seller user name -> finde user name -> get id
	// get id from current user

	useEffect(() => {
		const fetchSellerData = async () => {
			// fetch current seller
			const sellerRes = await api.get("/api/users/custom/current/")
			setSeller(sellerRes.data)
			console.log("Fetched seller data:", sellerRes.data)
			// fetch products using the seller ID from sellerData
			const productsRes = await api.get(
				`/api/users/custom/${sellerRes.data.id}/products/`
			)

			setProducts(productsRes.data)
			console.log("Fetched seller data:", productsRes.data)
		}
		fetchSellerData()
	}, [])

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Marketplace</h1>
			<CreateProduct />
			<ProductList products={products} />
		</div>
	)
}

export default Account
