import React from 'react';
import { useState, setState } from 'react';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Create.module.scss';
import config from '~/config';
import images from '~/assets/images';

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

//     formData.append('image', file);

//     axios({
//       url: '',
//       method: 'POST',
//       headers: {
//         authorization: 'your-token',
//       },
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

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('files', file);
    try {
      const response = await axios.post('localhost:8080/api/post/upload', formData);
      console.log(response);
    } catch (error) {
      console.error(error);
      console.log(formData);
    }
  };
  return (
    <div className={cx('create')}>
      <div className={cx('create-header')}>Create new post</div>
      <div className={cx('create-body')}>
        <img src={images.iconPostImg} alt="" />
        <div>
          <p>Drag photos and videos here</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileUpload} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
export default Create;
