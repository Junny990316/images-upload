import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AxiosProj from "../api/Axios";
import "./borderList.css";

const BorderList = () => {
    const [boardsList, setBoardList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const boardList = async () => {
          try {
            const rsp = await AxiosProj.getBorderList();
            console.log(rsp.data);
            setBoardList(rsp.data);
          } catch (error) {
            console.log(error);
          }
        };
        boardList();
        
      }, []);


    const handleWriteClick = () => {
        navigate(`/border`);
    }

    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {boardsList && boardsList.map((board) => (
                <tr key={board.id}>
                  <td>{board.title}</td>
                  <td>{board.content}</td>
                  <td className="img"> <img className="images" src={board.url} alt="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <button onClick={handleWriteClick}>Create</button>
        </div>
      );
    };

export default BorderList;