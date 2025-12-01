import { useEffect, useState } from "react"
import api from "../api"

export default function AdminView() {
	const [activeTab, setActiveTab] = useState("products")

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-6 text-gray-800">
					Admin Dashboard
				</h1>

				{/* Tab Navigation */}
				<div className="flex gap-4 mb-8 border-b">
					<button
						onClick={() => setActiveTab("products")}
						className={`px-6 py-3 font-semibold transition-colors ${
							activeTab === "products"
								? "border-b-4 border-blue-500 text-blue-600"
								: "text-gray-600 hover:text-blue-500"
						}`}
					>
						Products Management
					</button>
					<button
						onClick={() => setActiveTab("users")}
						className={`px-6 py-3 font-semibold transition-colors ${
							activeTab === "users"
								? "border-b-4 border-blue-500 text-blue-600"
								: "text-gray-600 hover:text-blue-500"
						}`}
					>
						Users Management
					</button>
					<button
						onClick={() => setActiveTab("reports")}
						className={`px-6 py-3 font-semibold transition-colors ${
							activeTab === "reports"
								? "border-b-4 border-blue-500 text-blue-600"
								: "text-gray-600 hover:text-blue-500"
						}`}
					>
						Reports Management
					</button>
				</div>

				{/* Tab Content */}
				{activeTab === "products" && <ProductsManagement />}
				{activeTab === "users" && <UsersManagement />}
				{activeTab === "reports" && <ReportsManagement />}
			</div>
		</div>
	)
}

// ==================== PRODUCTS MANAGEMENT ====================
function ProductsManagement() {
	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [editingProduct, setEditingProduct] = useState(null)
	const [showCreateForm, setShowCreateForm] = useState(false)

	// Form states
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")
	const [category, setCategory] = useState("")
	const [status, setStatus] = useState("In Stock")
	const [image, setImage] = useState(null)
	const [imagePreview, setImagePreview] = useState(null)

	useEffect(() => {
		fetchProducts()
		fetchCategories()
	}, [])

	const fetchProducts = () => {
		api.get("/api/products/")
			.then((res) => setProducts(res.data))
			.catch((err) => console.error("Error fetching products:", err))
	}

	const fetchCategories = () => {
		api.get("/api/categories/")
			.then((res) => setCategories(res.data))
			.catch((err) => console.error("Error fetching categories:", err))
	}

	const resetForm = () => {
		setName("")
		setDescription("")
		setPrice("")
		setQuantity("")
		setCategory("")
		setStatus("In Stock")
		setImage(null)
		setImagePreview(null)
		setEditingProduct(null)
		setShowCreateForm(false)
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImage(file)
			// Create preview URL
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const createProduct = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append("name", name)
		formData.append("description", description)
		formData.append("price", parseFloat(price))
		formData.append("quantity", parseInt(quantity, 10))
		formData.append("category", parseInt(category, 10))
		formData.append("status", status)

		// Add image if selected
		if (image) {
			formData.append("image", image)
		}

		api.post("/api/products/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then((res) => {
				if (res.status === 201) {
					fetchProducts()
					resetForm()
					alert("Product created successfully!")
				}
			})
			.catch((err) => {
				console.error("Error creating product:", err)
				alert("Failed to create product")
			})
	}

	const updateProduct = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append("name", name)
		formData.append("description", description)
		formData.append("price", parseFloat(price))
		formData.append("quantity", parseInt(quantity, 10))
		formData.append("category", parseInt(category, 10))
		formData.append("status", status)

		// Add image only if a new one was selected
		if (image) {
			formData.append("image", image)
		}

		api.put(`/api/products/${editingProduct.id}/`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then((res) => {
				if (res.status === 200) {
					fetchProducts()
					resetForm()
					alert("Product updated successfully!")
				}
			})
			.catch((err) => {
				console.error("Error updating product:", err)
				alert("Failed to update product")
			})
	}

	const deleteProduct = (id, productName) => {
		if (
			!window.confirm(`Are you sure you want to delete "${productName}"?`)
		) {
			return
		}

		api.delete(`/api/products/${id}/`)
			.then((res) => {
				if (res.status === 204) {
					fetchProducts()
					alert("Product deleted successfully!")
				}
			})
			.catch((err) => {
				console.error("Error deleting product:", err)
				alert("Failed to delete product")
			})
	}

	const startEdit = (product) => {
		setEditingProduct(product)
		setName(product.name)
		setDescription(product.description)
		setPrice(product.price)
		setQuantity(product.quantity)
		setCategory(product.category || "")
		setStatus(product.status)
		setImage(null)
		// Show existing image if available
		if (product.images && product.images.length > 0) {
			setImagePreview(product.images[0].image)
		} else {
			setImagePreview(null)
		}
		setShowCreateForm(false)
	}

	return (
		<div>
			{/* Create/Edit Form */}
			{(showCreateForm || editingProduct) && (
				<div className="mb-10 p-6 bg-white border rounded-lg shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-gray-800">
							{editingProduct ? "Edit Product" : "Create Product"}
						</h2>
						<button
							onClick={resetForm}
							className="text-gray-500 hover:text-gray-700 text-2xl"
						>
							×
						</button>
					</div>

					<form
						onSubmit={
							editingProduct ? updateProduct : createProduct
						}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Name:
								</label>
								<input
									className="block border border-gray-300 rounded p-2 w-full"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Category:
								</label>
								<select
									className="block border border-gray-300 rounded p-2 w-full"
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
									required
								>
									<option value="">Select category</option>
									{categories.map((c) => (
										<option key={c.id} value={c.id}>
											{c.category_name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Price:
								</label>
								<input
									type="number"
									step="0.01"
									className="block border border-gray-300 rounded p-2 w-full"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Quantity:
								</label>
								<input
									type="number"
									className="block border border-gray-300 rounded p-2 w-full"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Status:
								</label>
								<select
									className="block border border-gray-300 rounded p-2 w-full"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="In Stock">In Stock</option>
									<option value="Out of Stock">
										Out of Stock
									</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Product Image:
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="block border border-gray-300 rounded p-2 w-full"
								/>
								{imagePreview && (
									<div className="mt-2">
										<img
											src={imagePreview}
											alt="Preview"
											className="w-32 h-32 object-cover rounded border"
										/>
									</div>
								)}
							</div>
						</div>
						<div className="mt-4">
							<label className="block text-sm font-medium mb-2">
								Description:
							</label>
							<textarea
								className="block border border-gray-300 rounded p-2 w-full"
								rows="4"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							></textarea>
						</div>{" "}
						<div className="flex gap-3 mt-6">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
							>
								{editingProduct ? "Update" : "Create"}
							</button>
							<button
								type="button"
								onClick={resetForm}
								className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Create Button */}
			{!showCreateForm && !editingProduct && (
				<button
					onClick={() => setShowCreateForm(true)}
					className="mb-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
				>
					+ Create New Product
				</button>
			)}

			{/* Products Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<h2 className="text-2xl font-semibold p-6 border-b">
					Products List ({products.length})
				</h2>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Description
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Price
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Quantity
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Seller
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{products.map((product) => (
								<tr
									key={product.id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 text-sm">
										{product.id}
									</td>
									<td className="px-6 py-4 text-sm font-medium">
										{product.name}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
										{product.description}
									</td>
									<td className="px-6 py-4 text-sm">
										${product.price}
									</td>
									<td className="px-6 py-4 text-sm">
										{product.quantity}
									</td>
									<td className="px-6 py-4 text-sm">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												product.status === "In Stock"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{product.status}
										</span>
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{product.seller?.username || "N/A"}
									</td>
									<td className="px-6 py-4 text-sm">
										<button
											onClick={() => startEdit(product)}
											className="text-blue-600 hover:text-blue-800 mr-3"
										>
											Edit
										</button>
										<button
											onClick={() =>
												deleteProduct(
													product.id,
													product.name
												)
											}
											className="text-red-600 hover:text-red-800"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{products.length === 0 && (
						<div className="text-center py-10 text-gray-500">
							No products found. Create your first product!
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

// ==================== USERS MANAGEMENT ====================
function UsersManagement() {
	const [users, setUsers] = useState([])
	const [editingUser, setEditingUser] = useState(null)
	const [showCreateForm, setShowCreateForm] = useState(false)

	// Form states
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [dob, setDob] = useState("")
	const [password, setPassword] = useState("")
	const [isSeller, setIsSeller] = useState(false)
	const [isStaff, setIsStaff] = useState(false)

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = () => {
		api.get("/api/users/")
			.then((res) => setUsers(res.data))
			.catch((err) => console.error("Error fetching users:", err))
	}

	const resetForm = () => {
		setUsername("")
		setEmail("")
		setFirstName("")
		setLastName("")
		setDob("")
		setPassword("")
		setIsSeller(false)
		setIsStaff(false)
		setEditingUser(null)
		setShowCreateForm(false)
	}

	const createUser = (e) => {
		e.preventDefault()

		const data = {
			username,
			email,
			first_name: firstName,
			last_name: lastName,
			dob: dob || null,
			password,
			is_seller: isSeller,
			is_staff: isStaff,
		}

		api.post("/api/register/", data)
			.then((res) => {
				if (res.status === 201) {
					fetchUsers()
					resetForm()
					alert("User created successfully!")
				}
			})
			.catch((err) => {
				console.error("Error creating user:", err)
				alert(
					"Failed to create user: " +
						(err.response?.data?.detail || "Unknown error")
				)
			})
	}

	const updateUser = (e) => {
		e.preventDefault()

		const data = {
			username,
			email,
			first_name: firstName,
			last_name: lastName,
			dob: dob || null,
			is_seller: isSeller,
			is_staff: isStaff,
		}

		// Only include password if it's been changed
		if (password) {
			data.password = password
		}

		api.put(`/api/users/${editingUser.id}/`, data)
			.then((res) => {
				if (res.status === 200) {
					fetchUsers()
					resetForm()
					alert("User updated successfully!")
				}
			})
			.catch((err) => {
				console.error("Error updating user:", err)
				alert(
					"Failed to update user: " +
						(err.response?.data?.detail || "Unknown error")
				)
			})
	}

	const deleteUser = (id, username) => {
		if (
			!window.confirm(
				`Are you sure you want to delete user "${username}"?`
			)
		) {
			return
		}

		api.delete(`/api/users/${id}/`)
			.then((res) => {
				if (res.status === 204) {
					fetchUsers()
					alert("User deleted successfully!")
				}
			})
			.catch((err) => {
				console.error("Error deleting user:", err)
				alert("Failed to delete user")
			})
	}

	const startEdit = (user) => {
		setEditingUser(user)
		setUsername(user.username)
		setEmail(user.email)
		setFirstName(user.first_name || "")
		setLastName(user.last_name || "")
		setDob(user.dob || "")
		setPassword("") // Don't populate password for security
		setIsSeller(user.is_seller || false)
		setIsStaff(user.is_staff || false)
		setShowCreateForm(false)
	}

	return (
		<div>
			{/* Create/Edit Form */}
			{(showCreateForm || editingUser) && (
				<div className="mb-10 p-6 bg-white border rounded-lg shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-gray-800">
							{editingUser ? "Edit User" : "Create User"}
						</h2>
						<button
							onClick={resetForm}
							className="text-gray-500 hover:text-gray-700 text-2xl"
						>
							×
						</button>
					</div>

					<form onSubmit={editingUser ? updateUser : createUser}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Username:
								</label>
								<input
									className="block border border-gray-300 rounded p-2 w-full"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Email:
								</label>
								<input
									type="email"
									className="block border border-gray-300 rounded p-2 w-full"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									First Name:
								</label>
								<input
									className="block border border-gray-300 rounded p-2 w-full"
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Last Name:
								</label>
								<input
									className="block border border-gray-300 rounded p-2 w-full"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Date of Birth:
								</label>
								<input
									type="date"
									className="block border border-gray-300 rounded p-2 w-full"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Password:
									{editingUser && (
										<span className="text-xs text-gray-500 ml-2">
											(Leave blank to keep current)
										</span>
									)}
								</label>
								<input
									type="password"
									className="block border border-gray-300 rounded p-2 w-full"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required={!editingUser}
								/>
							</div>

							<div className="flex items-center gap-6">
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={isSeller}
										onChange={(e) =>
											setIsSeller(e.target.checked)
										}
										className="w-4 h-4"
									/>
									<span className="text-sm font-medium">
										Is Seller
									</span>
								</label>

								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={isStaff}
										onChange={(e) =>
											setIsStaff(e.target.checked)
										}
										className="w-4 h-4"
									/>
									<span className="text-sm font-medium">
										Is Staff
									</span>
								</label>
							</div>
						</div>

						<div className="flex gap-3 mt-6">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
							>
								{editingUser ? "Update" : "Create"}
							</button>
							<button
								type="button"
								onClick={resetForm}
								className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Create Button */}
			{!showCreateForm && !editingUser && (
				<button
					onClick={() => setShowCreateForm(true)}
					className="mb-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
				>
					+ Create New User
				</button>
			)}

			{/* Users Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<h2 className="text-2xl font-semibold p-6 border-b">
					Users List ({users.length})
				</h2>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Username
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Seller
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Staff
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Joined
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm">
										{user.id}
									</td>
									<td className="px-6 py-4 text-sm font-medium">
										{user.username}
									</td>
									<td className="px-6 py-4 text-sm">
										{user.email}
									</td>
									<td className="px-6 py-4 text-sm">
										{user.first_name} {user.last_name}
									</td>
									<td className="px-6 py-4 text-sm">
										{user.is_seller ? (
											<span className="text-green-600">
												✓
											</span>
										) : (
											<span className="text-gray-400">
												✗
											</span>
										)}
									</td>
									<td className="px-6 py-4 text-sm">
										{user.is_staff ? (
											<span className="text-green-600">
												✓
											</span>
										) : (
											<span className="text-gray-400">
												✗
											</span>
										)}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{user.created_at
											? new Date(
													user.created_at
											  ).toLocaleDateString()
											: "N/A"}
									</td>
									<td className="px-6 py-4 text-sm">
										<button
											onClick={() => startEdit(user)}
											className="text-blue-600 hover:text-blue-800 mr-3"
										>
											Edit
										</button>
										<button
											onClick={() =>
												deleteUser(
													user.id,
													user.username
												)
											}
											className="text-red-600 hover:text-red-800"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{users.length === 0 && (
						<div className="text-center py-10 text-gray-500">
							No users found.
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

// ==================== REPORTS MANAGEMENT ====================
function ReportsManagement() {
	const [reports, setReports] = useState([])
	const [editingReport, setEditingReport] = useState(null)
	const [showCreateForm, setShowCreateForm] = useState(false)

	// Form states
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	useEffect(() => {
		fetchReports()
	}, [])

	const fetchReports = () => {
		api.get("/api/reports/")
			.then((res) => setReports(res.data))
			.catch((err) => console.error("Error fetching reports:", err))
	}

	const resetForm = () => {
		setTitle("")
		setDescription("")
		setEditingReport(null)
		setShowCreateForm(false)
	}

	const handleCreateReport = (e) => {
		e.preventDefault()

		const reportData = {
			title,
			description,
		}

		api.post("/api/reports/", reportData)
			.then((res) => {
				if (res.status === 201) {
					alert("Report created successfully!")
					fetchReports()
					resetForm()
				}
			})
			.catch((err) => {
				console.error("Error creating report:", err)
				alert(err.response?.data?.detail || "Failed to create report")
			})
	}

	const handleUpdateReport = (e) => {
		e.preventDefault()

		const reportData = {
			title,
			description,
		}

		api.put(`/api/reports/${editingReport.report_id}/`, reportData)
			.then((res) => {
				if (res.status === 200) {
					alert("Report updated successfully!")
					fetchReports()
					resetForm()
				}
			})
			.catch((err) => {
				console.error("Error updating report:", err)
				alert(err.response?.data?.detail || "Failed to update report")
			})
	}

	const deleteReport = (reportId, reportTitle) => {
		if (
			window.confirm(
				`Are you sure you want to delete the report "${reportTitle}"?`
			)
		) {
			api.delete(`/api/reports/${reportId}/`)
				.then((res) => {
					if (res.status === 204) {
						alert("Report deleted successfully!")
						fetchReports()
					}
				})
				.catch((err) => {
					console.error("Error deleting report:", err)
					alert("Failed to delete report")
				})
		}
	}

	const startEdit = (report) => {
		setEditingReport(report)
		setTitle(report.title)
		setDescription(report.description)
		setShowCreateForm(false)
	}

	return (
		<div>
			{/* Create/Edit Form */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8">
				{!showCreateForm && !editingReport && (
					<button
						onClick={() => setShowCreateForm(true)}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Create New Report
					</button>
				)}

				{(showCreateForm || editingReport) && (
					<div>
						<h3 className="text-2xl font-semibold mb-4 text-gray-800">
							{editingReport
								? "Edit Report"
								: "Create New Report"}
						</h3>
						<form
							onSubmit={
								editingReport
									? handleUpdateReport
									: handleCreateReport
							}
						>
							<div className="grid grid-cols-1 gap-4 mb-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Title
									</label>
									<input
										type="text"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										required
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										placeholder="Report title"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Description
									</label>
									<textarea
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
										required
										rows="4"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
										placeholder="Report description"
									></textarea>
								</div>
							</div>

							<div className="flex gap-3">
								<button
									type="submit"
									className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									{editingReport ? "Update" : "Create"}
								</button>
								<button
									type="button"
									onClick={resetForm}
									className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}
			</div>

			{/* Reports Table */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="px-6 py-4 bg-gray-50 border-b">
					<h3 className="text-xl font-semibold text-gray-800">
						All Reports
					</h3>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Description
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Reporter
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date Reported
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{reports.map((report) => (
								<tr
									key={report.report_id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 text-sm font-medium text-gray-900">
										{report.title}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{report.description.length > 100
											? report.description.substring(
													0,
													100
											  ) + "..."
											: report.description}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{report.reporter?.username || "N/A"}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{new Date(
											report.date_reported
										).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 text-sm">
										<button
											onClick={() => startEdit(report)}
											className="text-blue-600 hover:text-blue-800 mr-3"
										>
											Edit
										</button>
										<button
											onClick={() =>
												deleteReport(
													report.report_id,
													report.title
												)
											}
											className="text-red-600 hover:text-red-800"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{reports.length === 0 && (
						<div className="text-center py-10 text-gray-500">
							No reports found.
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
