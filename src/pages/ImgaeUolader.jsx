import React, { useState, useEffect } from 'react';
import { storage } from '../api/firebase';
import './imageUploader.css';
import AxiosProj from '../api/Axios';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsFileSelected(true);
    }
  };

  const writeTitle = (e) => {
    setTitle(e.target.value);
  }

  const writeContent = (e) => {
    setContent(e.target.value);
  }

  const handleUploadClick = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    try {
      if (!file) {
        alert("You need to add a file");
        return;
      }

      fileRef.put(file).then(() => {
        console.log('File uploaded successfully!');
        alert("File uploaded successfully!");

        fileRef.getDownloadURL().then((url) => {
          console.log("Storage URL: " + url);
          setUrl(url);
        });
      });
    } catch (error) {
      console.error('Error during file upload:', error.message);
    }
  };

  const clickWrite = async () => {
    try {
      if (!isFileSelected) {
        alert("You need to add a file before creating the border");
        return;
      }

      const response = await AxiosProj.borderCreate(title, content, url);
      console.log('Border created successfully:', response.data);
      // Handle any other logic after creating the border
    } catch (error) {
      console.error('Error creating border:', error);
      // Handle errors
    }
  };

  useEffect(() => {
    // Firebase Storage에서 모든 파일 목록을 가져오기
    const storageRef = storage.ref();
    storageRef.listAll().then((result) => {
      const filesArray = result.items.map((item) => {
        return { name: item.name, url: '' }; // 여기서 URL은 초기값으로 빈 문자열을 사용
      });
      setFile(filesArray);
      // 각 파일의 다운로드 URL 가져오기
      filesArray.forEach((file, index) => {
        result.items[index].getDownloadURL().then((url) => {
          filesArray[index].url = url;
          setFile([...filesArray]); // 상태를 업데이트하여 화면을 다시 렌더링
        });
      });
    });
  }, []);

  return (
    <div>
      <div className="Title">
        <div className="title">제목</div>
        <input type="text" placeholder="제목을 입력하세요" value={title} onChange={writeTitle} />
      </div>
      <div className="rvCon">
        <div className="rvContent">내용</div>
        <textarea placeholder="내용을 입력하세요" value={content} onChange={writeContent} />
      </div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      <button onClick={clickWrite} disabled={!isFileSelected}>Write</button>
      <br />
      {url && (
        <>
          {file.type && file.type.startsWith('image/') ? (
            <img src={url} alt="uploaded" />
          ) : (
            <video width="320" height="240" controls>
              <source src={url} type={file.type} />
            </video>
          )}
        </>
      )}
    </div>
  );
}

export default ImageUploader;
