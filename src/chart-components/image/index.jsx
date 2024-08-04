import React, { useState } from 'react';
import "./image.scss";

const Image = ({ title = 'hello' }) => {
  const [image, setImage] = useState(null);
  const [fileInputVisible, setFileInputVisible] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFileInputVisible(false); // Hide the file input after image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='IMAGE-CONTAINER'>
      {/* Title Container */}
      <div>
        <h4>{title}</h4>
      </div>
      {/* Image Container */}
      <div className='IMAGE-CONTAINER-UPLOAD'>
        {fileInputVisible && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={fileInputVisible ? '' : 'hidden'} // Add 'hidden' class when needed
          />
        )}
        {image && (
          <div className='IMAGE-PREVIEW'>
            <img src={image} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Image;
