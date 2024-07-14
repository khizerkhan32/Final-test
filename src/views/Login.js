import { APIS, useAPI } from '../apis/config';
import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [user, setUser] = useState();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [login_api, loading] = useAPI(APIS.login);
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const { data } = await login_api({
        username: login.email,
        password: login.password,
      });
      console.log(data);
      setUser(data);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userName', data.name);
      window.location.reload();
      //   navigate('/Dash'); // Navigate to the dashboard after login
    } catch (err) {
      console.log('Error in login page', err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div style={{ width: '40%' }}>
            <h2>Welcome</h2>
            <p>Sign in to continue</p>
          </div>
          <div style={{ width: '50%' }}>
            <img src={'/Images/image-1.png'} alt="person" />
          </div>
        </div>
        <div className="login-form">
          <label className="form-label">Username or Email</label>
          <input
            name="email"
            className="form-input"
            placeholder="Username or Email"
            type="email"
            value={login.email}
            onChange={handleChange}
          />
          <label className="form-label">Password</label>
          <input
            name="password"
            className="form-input"
            placeholder="Password"
            type="password"
            value={login.password}
            onChange={handleChange}
          />
          <span className="forgot-password">Forgot password</span>
          <Button
            style={{ margin: '24px auto 0 auto', width: '100%' }}
            onClick={handleSubmit}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
