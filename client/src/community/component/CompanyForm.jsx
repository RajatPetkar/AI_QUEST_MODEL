import React, { useState } from 'react';
import axios from 'axios';
import './form.css';  

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    website: '',
    industry: '',
    founded: '',
    logo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ai-quest-backend.onrender.com/api/company', formData);
      alert(response.data.message);
      setFormData({
        name: '',
        description: '',
        location: '',
        website: '',
        industry: '',
        founded: '',
        logo: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
   
  };

  return (
    <div className="company-form-container">
      <h2>Add a New Company</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <label>
          Industry:
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Founded:
          <input
            type="text"
            name="founded"
            value={formData.founded}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Logo URL:
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompanyForm;
