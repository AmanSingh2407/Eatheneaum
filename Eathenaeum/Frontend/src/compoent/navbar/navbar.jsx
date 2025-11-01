import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import propType from 'prop-types'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/storecontextfile'

const Navbar = ({ setLoginShow, setCurState }) => {

    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [input, setInput] = useState('');
    const { token, setToken, userInfo, overflowCon, url, bookList, setSearchResult, resetFunction, resetScroll } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem('token');
        setToken("");
        navigate("/");
    }

    const onSearchShow = () => {
        document.getElementById('navbar-logo-Id').classList.toggle("disable");
        let rightBox = document.getElementsByClassName('navbar-right-box');
        let search_box = document.getElementsByClassName('navbar-search-box');
        if (rightBox[0].style.display == '' || !(rightBox[0].style.display == 'none')) {
            rightBox[0].style.display = 'none'
            search_box[0].style.display = 'flex'
        }
        else {
            rightBox[0].style.display = "flex"
            search_box[0].style.display = 'none'
        }
        document.getElementById("navbar-closed-Id").classList.toggle("disable")
    }
 
    const searchResult = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        if (inputValue.length) {
            const filteredResults = bookList.filter((book) => {
                return book.title.toLowerCase().includes(inputValue.toLowerCase());
            });
            setResult(filteredResults);
        } else {
            setResult([]);
        }
    };

    const displaySearchResult = () => {
        let count = 1;
        const content = result.map((book) => {
            if (count <= 10) {
                count++;
                return (
                    <li key={book.id} onClick={() => selectInput(book)}>
                        <img src={assets.search_icon} alt="Search Icon" />
                        <span>{book.title}</span>
                    </li>
                );
            }
        });
        return content;
    };

    const selectInput = (list) => {
        setInput(list.title);
        setResult([])
    }

    const showSearchResult = () => {
        setSearchResult(input)
        setInput("")
        setResult([])
        navigate("/");
    }

    return (
        <div className='navbar nav-flex'>
            <Link to='/' className='navbar-logo' id='navbar-logo-Id' onClick={resetFunction}>E-Athenaeum</Link>
            <nav className='navbar-menu'>
                <Link to="/" onClick={resetFunction}>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact/privacy-policy' >Policy</Link>
                <Link to='/contact/main' >Contact</Link>
            </nav>
            <div className="navbar-search-box nav-flex">
                <img className='disable' src={assets.close_btn} id='navbar-closed-Id' onClick={onSearchShow} />
                <div>
                    <input type="text" value={input} onChange={searchResult} placeholder="Search..." />
                    <button className='' type="button" onClick={showSearchResult}>
                        <img src={assets.search} alt="Search Icon" />
                    </button>
                </div>
                <ul className="navbar-search-result" id='search-result-box'>
                    {displaySearchResult()}
                </ul>
            </div>
            <div className='d-flex navbar-right-box'>
                <img className='search_btn' onClick={onSearchShow} src={assets.search_icon} id='navbar-right-box-Id_1' />
                {!token
                    ? <> <div className='navbar-login-sigup nav-flex'>
                        <button  onClick={() => { setLoginShow(true), setCurState("Login"); overflowCon() }}>LOGIN</button>
                        {/* <button className='btn' onClick={() => { setLoginShow(true), setCurState("Sign Up"); overflowCon() }}>SIGN UP</button> */}
                    </div>
                    </>
                    : <>
                        <Link to='/cart'><img className='navbar-cart' width='40' src={assets.cart} alt="" id='navbar-right-box-Id_2' /></Link>
                        <div className="navbar-profile">
                            <img className='navbar-profile-icon ' src={url + '/profile/image/' + userInfo.profileName} alt="" id='navbar-right-box-Id_3' />
                            <ul className="navbar-profile-dropdown">
                                <li className="navbar-profile-dropdown-info">
                                    <img className='navbar-profile-icon' src={url + '/profile/image/' + userInfo.profileName} alt="" />
                                    <div>
                                        <p className='capitalize'>{userInfo.name}</p>
                                        <p>{userInfo.email}</p>
                                    </div>
                                </li>
                                {/* <li> <Link to='/' ><img src={assets.} alt="" /><span>Home</span></Link></li> */}
                                <li> <Link onClick={resetScroll} to='/profile' className='navbar-profile-dropdown-option' ><img src={assets.account} alt="" /><span>Profile</span></Link></li>
                                <li> <Link onClick={resetScroll} to='/mybook' className='navbar-profile-dropdown-option' ><img src={assets.book_Collection} alt="" /><span>My Books</span></Link></li>
                                <li> <Link onClick={resetScroll} to='/cart' className='navbar-profile-dropdown-option' ><img src={assets.cartIcon} alt="" /><span>Cart</span></Link></li>
                                {/* <li> <Link onClick={resetScroll} to='/' className='navbar-profile-dropdown-option' ><img src={assets.transaction} alt="" /><span>Transaction</span></Link></li> */}
                                <li> <Link onClick={resetScroll} to='/contact/main' className='navbar-profile-dropdown-option' ><img src={assets.contactUs} alt="" /><span>Contact Us</span></Link></li>
                                <li> <Link onClick={resetScroll} to='/about' className='navbar-profile-dropdown-option' ><img src={assets.aboutUs} alt="" /><span>About</span></Link></li>
                                <li> <Link onClick={resetScroll} to='/contact/help' className='navbar-profile-dropdown-option' ><img src={assets.help} alt="" /><span>Help</span></Link></li>
                                <li> <div onClick={logout} className='navbar-profile-dropdown-option' ><img src={assets.logout} alt="" /><span>Logout</span></div></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

Navbar.propTypes = {
    setLoginShow: propType.func,
    setCurState: propType.func,
    curState: propType.string
}

export default Navbar;
