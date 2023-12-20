import React, { useState } from 'react';
import './registraion.css';
import { useNavigate } from 'react-router-dom';

export const employees = [
    { name: 'John Doe', age: 30, position: 'Software Engineer' },
    { name: 'Jane Smith', age: 25, position: 'UI/UX Designer' },
    { name: 'Bob Johnson', age: 35, position: 'Product Manager' },
  ];

export const RegistrationForm = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let emptyArray = [];
        const user = localStorage.getItem('userData');
        if (!user) {
            emptyArray = [formData]
        }
        if (user && user.length) {
            emptyArray = [...JSON.parse(user), ...[formData]]
        }
        // Store data in local storage
        localStorage.setItem('userData', JSON.stringify(emptyArray));

        // Clear form data
        setFormData({
            username: '',
            email: '',
            password: '',
        });

        alert('Registration successful!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Register</button>
            <br/>
            <span>Already have an account? <a href='/login'>login here</a></span>
        </form>
    );
};

export const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = (event) => {
        event.preventDefault();

        // Check credentials in local storage
        let storedUsername = localStorage.getItem('userData');
        storedUsername = JSON.parse(storedUsername)

        const result = storedUsername.find((item) => {
            return item.username && item.password && item.username === username && item.password === password
        })
        if (storedUsername && storedUsername.length && result) {
            // Successful login
            setLoggedIn(true);
            setErrorMessage('');
            navigate('/userList');
            alert('Login successful!');
        } else {
            // Failed login
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
    );
};


export const EmployeeList = ({ employees }) => {
  return (
    <div>
      <h2>Employee List</h2>
      <table align='center'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
                <td>
{index+1}
              </td>
              <td>
                <a href={`/user/${employee.name}`}>{employee.name}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {}
    </div>
  );
};

export const Viewemployee = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const name = url.pathname.split('/');
    const userData = employees.find((item) => {
        console.log(item.name,name[2])
        return item.name && item.name === decodeURIComponent(name[2]); 
    })
    return (<div>
        <strong>Name:</strong> {userData.name} <br />
        <strong>Age:</strong> {userData.age} <br />
        <strong>Position:</strong> {userData.position}
        </div>)
}


