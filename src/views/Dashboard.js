import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';

function Dashboard() {
  const navigate = useNavigate();
  const [allitems, setAllItems] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };
  const [get_all_items, loading] = useAPI(APIS.get_all_items);
  async function getallitems() {
    try {
      const { data } = await get_all_items();
      console.log(data);
      const First_four = data.post.splice(0, 4);
      setAllItems(First_four);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getallitems();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
