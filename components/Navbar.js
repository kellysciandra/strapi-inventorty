import Link from 'next/link';
import {NavbarContainer, NavBrand, NavLink} from './nav.styles.js'

const Navbar = () => (
    <NavbarContainer>
    
        {/* <NavBrand>
            <Link href="/">
                <a className="navlink">Inventory</a>
            </Link>
        </NavBrand> */}

        <NavLink>
            <Link href="/">
                <a className="navlink">Home</a>
            </Link>
            <Link href="/new">
                <a className="navlink">Add Item</a>
            </Link>
            <Link href="/past">
                <a className="navlink">Past Orders</a>
            </Link>
            <Link href="/order">
                <a className="navlink">Place Order</a>
            </Link>
            <Link href="/">
                <a className="navlink">Food</a>
            </Link>
            <Link href="/">
                <a className="navlink">Liquor</a>
            </Link>
            <Link href="/currentOrder">
                <a className="navlink">Paper</a>
            </Link>
        </NavLink>

    </NavbarContainer>
)

export default Navbar;