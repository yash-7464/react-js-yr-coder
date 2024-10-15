import Button from '../Button/Button';
import styles from './ContactForm.module.css';
import {MdMessage} from 'react-icons/md';
import {FaPhoneAlt} from 'react-icons/fa';
import {HiMail} from 'react-icons/hi';
import { useState } from 'react';

const ContactForm = () => {

    const [txt, setTxt] = useState("Mahdev");
    const [email, setEmail] = useState("mahdev@gmail.com");
    const [text, setText] = useState("Har har mahdev");


    const onSubmit=(event) =>{
        event.preventDefault();
        // name = event.target[0].value;
        // email = event.target[1].value;
        // text = event.target[2].value;
        setTxt(event.target[0].value);
        setEmail(event.target[1].value);
        setText(event.target[2].value);
       
    }

  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.contactForm}`}>
        <div className={styles.top_btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdMessage fontSize="24px" />}
          />
          <Button 
         
          text="VIA CALL" 
          icon={<FaPhoneAlt fontSize="24px" />} />
        </div>
        <Button
          isOutline={true}
          text="VIA EMAIL FORM"
          icon={<HiMail fontSize="24px" />}
        />

        <form onSubmit={onSubmit}>
          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="text">Text</label>
            <textarea name="text" rows="8"/>
          </div>
          <div style={{display: 'flex', justifyContent: 'end'}}>
            <Button text="SUBMIT" />
          </div>

            <div>
               
                <p>{txt}  {email} {text}</p>
            </div>

        </form>

      </div>
      <div className={`${styles.contactImage}`}>
        <img src="./images/Service.svg" alt="Contact Image" />
      </div>

    </section>
  );
};

export default ContactForm;
