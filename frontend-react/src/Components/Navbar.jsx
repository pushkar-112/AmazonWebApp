import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="app-header">
            <div className="brand-box">
                <span className="brand-logo">amazon</span>
                <span className="brand-suffix">:)</span>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/playground">Playground</Link>
                <span>Deals</span>
                <span>Contact</span>
            </div>
        </nav>
    )
}

export default Navbar
