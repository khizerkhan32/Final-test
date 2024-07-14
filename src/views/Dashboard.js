import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIS, useAPI } from '../apis/config';
import { Flex, Spin } from 'antd';
import './Dashboard.css';
import { IoEyeOutline } from 'react-icons/io5';
import { AiOutlineLike } from 'react-icons/ai';
import { GrDislike } from 'react-icons/gr';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.06)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

function Dashboard() {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const [get_all_items, loading] = useAPI(APIS.get_all_items);

  async function getAllItems() {
    try {
      const { data } = await get_all_items();
      setAllItems(data.posts.slice(0, 3));
    } catch (err) {
      console.log(err);
      setAllItems([]);
    }
  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome User,</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>{new Date().toDateString()}</p>
      <h2>Recent blogs</h2>
      <div className="blog-list">
        {loading ? (
          <div className="spiner-con">
            <Flex gap="small" vertical>
              <Flex gap="small">
                <Spin tip="Loading" size="large">
                  {content}
                </Spin>
              </Flex>
            </Flex>
          </div>
        ) : (
          allItems.map((item) => (
            <div
              className="blog-card"
              key={item.id}
              onClick={() => navigate(`/post/${item.id}`)} // Navigate to single post page
            >
              <div className="blog-header">
                <img
                  src={'/Images/image-2.svg'}
                  alt="Avatar"
                  className="avatar"
                />
                <div className="blog-title">
                  <h3>{item.title}</h3>
                  <p>{item.body.substring(0, 100)}...</p>
                </div>
              </div>
              <div className="blog-footer">
                <div className="icon-set">
                  <div
                    style={{
                      display: 'Flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <IoEyeOutline style={{ width: '21px', height: '20px' }} />
                    {item.views}
                  </div>
                  <div
                    style={{
                      display: 'Flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <AiOutlineLike style={{ width: '21px', height: '20px' }} />
                    {item.reactions.likes}
                  </div>
                  <div
                    style={{
                      display: 'Flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <GrDislike style={{ width: '21px', height: '20px' }} />
                    {item.reactions.dislikes}
                  </div>
                </div>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
