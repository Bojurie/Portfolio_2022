import React, {useState, useRef} from 'react';
import emailjs from '@emailjs/browser';
import Button from '../Button';
import './Contact.css';


const Contact = () => {
const form = useRef();

const sendEmail = (e) =>{
  e.preventDefault();

    emailjs.sendForm('service_sgy2c6a', 'template_hlu2f0r', e.target, 'user_ekwueKu8ixfoPD5a4qf2n')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    setSubmitted(true)
    e.target.reset();
}


  const [submitted, setSubmitted ] = useState(false);

  return (
    <div className='contact'>
      <div className='container'>
        <div className='contact-header'>
            <h1><span className='span'>4.</span> Contact</h1>
        </div>
        <div>
          <div className='message-wrapper'>
              <div className='message-heading'>
                <h2>Send Me a Message</h2>
                <p>
                  Got a question or wanted to say Hi, feel free to reach out.</p>
              </div>
              <form useRef={form} className='form' onSubmit={sendEmail}>
                {submitted  ?  <div className='success-message'>Success! Thank you for contacting us.</div> : null}
                <div className='form-info'>

                  <div className='form-info-top'>
                    <div className='name'>
                      <label>Your Name</label>
                      <input type='text' name='name' />
                      
                    </div>

                    <div className='email'>
                      <label>Email Address</label>
                      <input type='email' name='email' />
                      
                    </div>
                  </div>

                  <div className='message' >
                      <label>Your Message</label>
                      <textarea type='text' name='message'/>
                  </div>
                  
                </div>
                
                
                <Button type='submit' value='send' className='form-field-button'>
                Say Hello
               </Button>
                {/* <input className='form-field-button' type="submit" value="Send Message"  title/> */}
              </form>
              
              
          </div>
        </div>
       
      </div>
    </div> 
  )
}

export default Contact
