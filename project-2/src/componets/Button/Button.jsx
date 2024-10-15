import styles from './Button.module.css';

const Button = ({isOutline, icon, text, ...rest}) => {

  return (
    <div>
      <button {...rest} className={isOutline ? styles.outlineBtn : styles.primaryBtn}>
        {icon}
        {text}
      </button>
    </div>
  );
};

export default Button;
