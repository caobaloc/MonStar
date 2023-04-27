import { useState, useEffect } from 'react';

import HomeContent from '../Content';
import * as request from '~/utils/requests';

function HomePost() {
  const [dataPosts, setDataPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    request
      .get(`/posts`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setDataPosts(res.data.posts))
      .catch((error) => {
        console.log(error);
      });
  }, [dataPosts.comments]);
  return (
    <div>
      <br />
      <br />
      {dataPosts.map((index) => {
        return (
          <HomeContent
            key={index.id}
            idPost={index.id}
            username={index.user.username}
            imgAvatar={index.photo.url}
            like={index.likes.total == 0 ? (index.likes.total = '0 like') : index.likes.total + ' likes'}
            time={index.photo.created_at}
            caption={index.caption}
            comment={index.comments.total == '0' ? 'No comment' : `View all ${index.comments.total} comments`}
          />
        );
      })}
    </div>
  );
}
export default HomePost;
