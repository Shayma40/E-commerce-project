import React from 'react';
import './Contact.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';

const Contact = () => {

    const navigate = useNavigate();

    const onSubmit = async (event) => {
      event.preventDefault();

    const formData = new FormData(event.target);
    
        formData.append("access_key", "a6498729-3753-4bad-ad89-9809e8c974b3");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
        }
      };

      const handleClose = () => {
        navigate('/');
      };


  return (
    <section className='contact'>
      <form onSubmit={onSubmit} style={{
        maxWidth: '600px',
        width: '100%',
        background: '#EFECEC',
        padding: '25px 25px 30px',
        borderRadius: '8px',
        boxshadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        color: '#505655',
        margin: '25px',
        transition: 'transform .03s ease-in-out, box-shadow 0.3s ease-in-out',
        position: 'relative',
      }}>

        <div className="close-icon" onClick={handleClose}>
          <Close style={{ 
            color: '#505655', 
            fontSize: '30px' 
          }} />
        </div>

            <h2>Contact Us</h2>
            <div className='input-box'>
                <label>Full Name</label>
                <input type='text' className='field' placeholder='Enter your name' name='name' required />
            </div>
            <div className='input-box'>
                <label>Email Address</label>
                <input type='email' className='field' placeholder='Enter your email' name='email' required />
            </div>
            <div className='input-box'>
                <label>Your Message</label>
                <textarea name="message" className='field mess' placeholder='Enter your message' required />
            </div>
            <button type='submit'>Send Message</button>
        </form>
    </section>
  );
};

export default Contact;