import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import emailjs from 'emailjs-com';
import './contact.css';

function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_n5xfegl', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message.');
      });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-page" id='contact'>
      <header className="header">
        <h1>Contact Me</h1>
        <h3>Sorry this section is still in development</h3>
        <h4>Contact me at:ephywachira89@students.uonbi.ac.ke</h4>
      </header>
      <main>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" id='contactme'>Send</button>
        </form>
      </main>
      <footer className="footer">
        <p>© 2024 Ephy Muiruri</p>
        <div className="social-icons">
          <SocialIcon url="https://twitter.com/yourprofile" />
          <SocialIcon url="https://linkedin.com/in/yourprofile" />
          <SocialIcon url="https://github.com/Ephymuiruri" />
        </div>
      </footer>
    </div>
  );
}

export default ContactMe;
