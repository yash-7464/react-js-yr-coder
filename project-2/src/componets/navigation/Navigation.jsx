import style from "./navigation.module.css"

const Navigation = () => {
  return (
    <nav className={`${style.navigation} container`}>
      <div className='logo'>
        <img src="/images/logo.png" alt="do-some-logo" />
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navigation;
