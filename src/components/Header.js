import headerLogo from '../images/header__logo.svg';

function Logo () {
  return (
    <img src={headerLogo} alt="Лого" className="header__logo" />
  )
};

function Header() {
  return (
    <header className="header">
      <Logo />
    </header>
  )
};

export default Header;