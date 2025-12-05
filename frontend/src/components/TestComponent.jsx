import React from "react"
import { useState } from "react"

const TestComponent = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [openSubMenu, setOpenSubMenu] = useState(null)

	const toggleSubMenu = (menu) => {
		setOpenSubMenu(openSubMenu === menu ? null : menu)
	}

	return (
		<div className="flex">
			{/* Sidebar */}
			<div
				className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
					isCollapsed ? "w-16" : "w-64"
				}`}
			>
				<div className="p-4 flex justify-between items-center">
					<span
						className={`${
							isCollapsed ? "hidden" : "block"
						} font-bold`}
					>
						My Sidebar
					</span>
					<button
						className="p-1 rounded hover:bg-gray-700"
						onClick={() => setIsCollapsed(!isCollapsed)}
					>
						{isCollapsed ? "➡️" : "⬅️"}
					</button>
				</div>

				<ul>
					<li
						className="p-2 hover:bg-gray-700 cursor-pointer"
						onClick={() => toggleSubMenu("charts")}
					>
						Charts
					</li>
					{openSubMenu === "charts" && !isCollapsed && (
						<ul className="ml-4">
							<li className="p-2 hover:bg-gray-600 cursor-pointer">
								Pie Charts
							</li>
							<li className="p-2 hover:bg-gray-600 cursor-pointer">
								Line Charts
							</li>
						</ul>
					)}
					<li className="p-2 hover:bg-gray-700 cursor-pointer">
						Documentation
					</li>
					<li className="p-2 hover:bg-gray-700 cursor-pointer">
						Calendar
					</li>
				</ul>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold">Main Content</h1>
				<p>This is your main page content.</p>
			</div>
		</div>
	)
}
export default TestComponent
