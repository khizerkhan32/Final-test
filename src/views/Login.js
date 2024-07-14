import { APIS, useAPI } from '../apis/config';
import { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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
      //   navigate('/Dash');
      window.location.reload();
    } catch (err) {
      console.log('Error in login page', err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  return (
    <div>
      <div>
        <label className="form-label">Email</label>
        <input
          name="email"
          className="form-input"
          placeholder="Email"
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
      </div>
      <Button
        style={{ margin: '24px auto 0 auto', width: 100, display: 'block' }}
        onClick={handleSubmit}
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </div>
  );
};

export default Login;
