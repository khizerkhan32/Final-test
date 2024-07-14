import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoEyeOutline } from 'react-icons/io5';
import { AiOutlineLike } from 'react-icons/ai';
import { GrDislike } from 'react-icons/gr';
import { Flex, Spin } from 'antd';
import './SinglePost.css';

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.06)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '600px',
        }}
      >
        <Flex gap="small" vertical>
          <Flex gap="small">
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          </Flex>
        </Flex>
      </div>
    );
  }

  return (
    <div className="single-post-container">
      <div className="single-post-card">
        <img
          src={'/Images/image-2.svg'}
          alt="Avatar"
          style={{ width: '128px', height: '128px', borderRadius: '50%' }}
        />
        <div className="single-post-footer">
          <div className="icon-set">
            <div style={{ display: 'Flex', alignItems: 'center', gap: '4px' }}>
              <IoEyeOutline style={{ width: '21px', height: '20px' }} />
              {post.views}
            </div>
            <div style={{ display: 'Flex', alignItems: 'center', gap: '4px' }}>
              <AiOutlineLike style={{ width: '21px', height: '20px' }} />
              {post.reactions.likes}
            </div>
            <div style={{ display: 'Flex', alignItems: 'center', gap: '4px' }}>
              <GrDislike style={{ width: '21px', height: '20px' }} />
              {post.reactions.dislikes}
            </div>
          </div>
        </div>
        <div className="single-post-header">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
