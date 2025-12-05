import React, { useState } from "react"
import { Button } from "react-bootstrap"
import api from "../api"

const AddToCartButton = ({ productId, productName }) => {
	const [loading, setLoading] = useState(false)
	const [quantity, setQuantity] = useState(1)

	const handleAddToCart = async () => {
		setLoading(true)
		try {
			await api.post("/api/cart-items/", {
				product_id: productId,
				quantity: quantity,
			})
			alert(`${productName} added to cart!`)
		} catch (error) {
			console.error("Error adding to cart:", error)
			if (error.response?.status === 401) {
				alert("Please login to add items to cart")
			} else {
				alert(error.response?.data?.error || "Failed to add to cart")
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="d-flex align-items-center gap-2">
			<input
				type="number"
				min="1"
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
				className="form-control"
				style={{ width: "70px" }}
			/>
			<Button
				variant="primary"
				onClick={handleAddToCart}
				disabled={loading}
			>
				{loading ? "Adding..." : "Add to Cart"}
			</Button>
		</div>
	)
}

export default AddToCartButton
