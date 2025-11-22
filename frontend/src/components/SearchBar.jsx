import { useState } from "react";
import { searchItems } from "../api";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() === "") return;

        const data = await searchItems(query);
        setResults(data.results || []);
    };

    return (
        <div style={{ padding: "20px" }}>
            <input
                type="text"
                placeholder="Search listings..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "8px", width: "250px" }}
            />
            <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "8px" }}>
                Search
            </button>

            <ul style={{ marginTop: "20px" }}>
                {results.map((item) => (
                    <li key={item.id}>
                        <strong>{item.name}</strong> — ${item.price_cents / 100}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
