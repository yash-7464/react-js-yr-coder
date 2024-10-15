import {useState} from 'react';
import './App.css';
import Navigation from './componets/navigation/Navigation';
import ContactHeader from './componets/contactHeader/ContactHeader';
import ContactForm from './componets/ContactForm/ContactForm';

function App () {
  const [count, setCount] = useState (0);

  return (
    <div>
      <Navigation />
      <main className='main_container'>
        <ContactHeader />
        <ContactForm />
      </main>
    </div>
  );
}

export default App;
