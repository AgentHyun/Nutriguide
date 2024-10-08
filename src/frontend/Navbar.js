import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';
import { FaBars } from 'react-icons/fa'; // Sidebar에서 사용한 아이콘 모듈 가져오기

function Navbar({ toggleSidebar }) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const location = useLocation();
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
      <>
          <nav className='navbar'>
              <div className='navbar-container'>
                  {/* 메뉴 아이콘 */}
                  <div className='menu-icon' onClick={toggleSidebar}>
                      <FaBars /> {/* Sidebar에서 사용한 아이콘과 동일한 아이콘 모듈 사용 */}
                  </div>
                  {/* NutriGuide 로고 */}
                  <Link to='/' className={`navbar-logo ${location.pathname === '/' ? 'active-link' : ''}`} onClick={closeMobileMenu}>
                      <div className='navbar-logo'>Nutri</div>
                      <div className='navbar-logo2'>Guide</div>
                  </Link>
                  {/* Sidebar를 열기 위한 아이콘 */}
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                      <Link to='/' className={`nav-links ${location.pathname === '/' ? 'active-link' : ''}`} onClick={closeMobileMenu}>
                          Home
                      </Link>
                  </li>
                  <li className='nav-item'>
                      <Link to='/detail' className={`nav-links ${location.pathname === '/detail' ? 'active-link' : ''}`} onClick={closeMobileMenu}>
                          영양소 정보
                      </Link>
                  </li>
                  <li className='nav-item'>
                      <Link to='/question' className={`nav-links ${location.pathname === '/question' ? 'active-link' : ''}`} onClick={closeMobileMenu}>
                          AI 건강 상담
                      </Link>
                  </li>
                  <li className='nav-item'>
                      <Link to='/recommendation' className={`nav-links ${location.pathname === '/recommendation' ? 'active-link' : ''}`} onClick={closeMobileMenu}>
                          AI 영양제 추천
                      </Link>
                  </li>
                  
                  
              </ul>
          </nav>
      </>
  );
}

export default Navbar;
