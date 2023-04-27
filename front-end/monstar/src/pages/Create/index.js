import React from 'react';
import { useState, setState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import lazyLoad from 'react-lazyload';

import classNames from 'classnames/bind';
import styles from './Create.module.scss';
import config from '~/config';
import images from '~/assets/images';
import { postUpload } from '~/redux/APIRequest';

const cx = classNames.bind(styles);

// function Create() {
//   const [image, setImage] = useState('');

//   function handleImg(e) {
//     setImage(e.target.files[0]);
//     console.log(e.target.files);
//   }

//   function handleUpload() {
//     const formData = new FormData();
//     formData.append('files', image);
//     axios
//       .post('localhost:8080/api/post/upload', formData)
//       .then((res) => {
//         console.log('Thanh cong: ', res);
//       })
//       .catch((error) => {
//         console.log('Error: ', error, formData);
//       });
//   }
//   return (
//     <div className={cx('create')}>
//       <div className={cx('create-header')}>Create new post</div>
//       <div className={cx('create-body')}>
//         <img src={images.iconPostImg} alt="" />
//         <div>
//           <p>Drag photos and videos here</p>
//         </div>
//         <form>
//           <div>
//             <label htmlFor="">Select File</label>
//             <input type="file" multiple name="file" onChange={(e) => handleImg(e)} />
//           </div>
//           <br />
//           <button type="button" onClick={handleUpload}>
//             Upload
//           </button>
//         </form>
//       </div>
//     </div>
//   );

// const access_token = useSelector((sta) => sta.auth.login.currentUser);
// class Create extends React.Component {
//   state = {
//     file: null,
//   };
//   handleFile(e) {
//     let file = e.target.files;
//     this.setState({ files: file });
//   }

//   handleUpload(e) {
//     let file = this.state.file;
//     let formData = new FormData();

//     formData.append('files', file);
//     formData.append('caption', 'Loc dep zai');
//     axios.defaults.withCredentials = true;
//     axios({
//       url: 'http://localhost:8080/api/post/upload',
//       headers: {
//         Authorization: this.access_token.access_token,
//       },
//       method: 'POST',
//       data: formData,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   render() {
//     return (
//       <div className={cx('create')}>
//         <div className={cx('create-header')}>Create new post</div>
//         <div className={cx('create-body')}>
//           <img src={images.iconPostImg} alt="" />
//           <div>
//             <p>Drag photos and videos here</p>
//           </div>
//           <form>
//             <div>
//               <label htmlFor="">Select File</label>
//               <input type="file" name="file" onChange={(e) => this.handleFile(e)} />
//             </div>
//             <br />
//             <button type="button" onClick={(e) => this.handleUpload(e)}>
//               Upload
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

function Create() {
  const [file, setFile] = useState(null);
  const [captions, setCaptions] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const upload = useSelector((state) => state.auth.login.currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('files', file);
    formData.append('caption', captions);

    try {
      const response = await axios.post('http://localhost:8080/api/post', formData, {
        headers: {
          Authorization: 'Bearer ' + upload.data.access_token,
        },
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={cx('create')}>
      <div className={cx('create-header')}>Create new post</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={cx('create-body')}>
        <img src={images.iconPostImg} alt="" />
        <br />
        <div>
          <br />
          <p>Drag photos and videos here</p>
          <br />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileUpload} />
          <br />
          <br />
          <textarea placeholder="Write a caption" value={captions} onChange={(event) => setCaptions(event.target.value)} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
export default Create;
