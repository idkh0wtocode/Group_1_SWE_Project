import React, { useState, useEffect } from "react"
import { Card, Button, Table, Alert } from "react-bootstrap"
import api from "../api"

const Cart = () => {
	const [cart, setCart] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchCart()
	}, [])

	const fetchCart = async () => {
		setLoading(true)
		try {
			const response = await api.get("/api/cart-items/")
			// Group items by cart
			const items = response.data
			setCart({
				items: items,
				total_items: items.reduce(
					(sum, item) => sum + item.quantity,
					0
				),
				total_price: items.reduce(
					(sum, item) => sum + item.product.price * item.quantity,
					0
				),
			})
			setError(null)
		} catch (err) {
			console.error("Error fetching cart:", err)
			setError(err.response?.data?.detail || "Failed to load cart")
		} finally {
			setLoading(false)
		}
	}

	const updateQuantity = async (itemId, newQuantity) => {
		if (newQuantity < 1) return

		try {
			await api.patch(`/api/cart-items/${itemId}/`, {
				quantity: newQuantity,
			})
			fetchCart()
		} catch (err) {
			console.error("Error updating quantity:", err)
			alert("Failed to update quantity")
		}
	}

	const removeItem = async (itemId) => {
		if (!window.confirm("Remove this item from cart?")) return

		try {
			await api.delete(`/api/cart-items/${itemId}/`)
			fetchCart()
			alert("Item removed from cart")
		} catch (err) {
			console.error("Error removing item:", err)
			alert("Failed to remove item")
		}
	}

	const clearCart = async () => {
		if (!window.confirm("Clear all items from cart?")) return

		try {
			await api.delete("/api/cart-items/clear/")
			fetchCart()
			alert("Cart cleared")
		} catch (err) {
			console.error("Error clearing cart:", err)
			alert("Failed to clear cart")
		}
	}

	if (loading) {
		return <div className="text-center p-5">Loading cart...</div>
	}

	if (error) {
		return <Alert variant="danger">{error}</Alert>
	}

	if (!cart || cart.items.length === 0) {
		return (
			<Card className="text-center p-5">
				<Card.Body>
					<h3>Your cart is empty</h3>
					<p>Start shopping to add items to your cart!</p>
				</Card.Body>
			</Card>
		)
	}

	return (
		<div>
			<Card>
				<Card.Header className="d-flex justify-content-between align-items-center">
					<h3 className="mb-0">Shopping Cart</h3>
					<Button
						variant="outline-danger"
						size="sm"
						onClick={clearCart}
					>
						Clear Cart
					</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive>
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{cart.items.map((item) => (
								<tr key={item.id}>
									<td>
										<strong>{item.product.name}</strong>
										<br />
										<small className="text-muted">
											by {item.product.seller?.username}
										</small>
									</td>
									<td>${item.product.price}</td>
									<td>
										<div className="d-flex align-items-center gap-2">
											<Button
												size="sm"
												variant="outline-secondary"
												onClick={() =>
													updateQuantity(
														item.id,
														item.quantity - 1
													)
												}
												disabled={item.quantity <= 1}
											>
												-
											</Button>
											<span className="mx-2">
												{item.quantity}
											</span>
											<Button
												size="sm"
												variant="outline-secondary"
												onClick={() =>
													updateQuantity(
														item.id,
														item.quantity + 1
													)
												}
											>
												+
											</Button>
										</div>
									</td>
									<td>
										<strong>
											$
											{(
												item.product.price *
												item.quantity
											).toFixed(2)}
										</strong>
									</td>
									<td>
										<Button
											size="sm"
											variant="danger"
											onClick={() => removeItem(item.id)}
										>
											Remove
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					<div className="text-end mt-3">
						<h5>Total Items: {cart.total_items}</h5>
						<h4>Total Price: ${cart.total_price.toFixed(2)}</h4>
						<Button variant="success" size="lg" className="mt-3">
							Proceed to Checkout
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Cart
