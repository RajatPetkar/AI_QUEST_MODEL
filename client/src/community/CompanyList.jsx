import React, { useState, useEffect } from 'react';
import './App.css'; 
import axios from 'axios';
import CompanyForm from './component/CompanyForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://ai-quest-backend.onrender.com/api/companies');
        setCompanies(response.data);  
        setFilteredCompanies(response.data); 
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

 const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCompanies(companies.filter(company => company.name.toLowerCase().includes(term)));
  };

  return (
    <div className="app-container xyz">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search companies..."
        />
      </div>

      <div className="company-list">
        {filteredCompanies.length === 0 ? (
          <p className="no-results">No companies found</p>
        ) : (
          filteredCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <a href={`/companies/${company.id}`} className="company-link">
                <div className="company-card-content">
                  <div className="company-header">
                    <div className="company-logo">
                      <img
                        src={company.logo || 'https://via.placeholder.com/50'}
                        alt={company.name}
                        className="logo-img"
                      />
                    </div>
                    <h5 className="company-name">{company.name}</h5>
                  </div>
                  <div className="company-stats">
                    {/* <span className="employee-count">{company.employeeCount} employees</span> */}
                    <p>Established year : {company.founded}</p>
                    <p>Location : {company.location}</p>

                  </div>
                  <p className="company-description">{company.description}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
