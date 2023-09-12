import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import char2 from 'assets/char2x4.png';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname, setRoles } from 'redux/Auth';
import apis from 'services/api/apis';

const Register = () => {

  

  const dispatch = useDispatch();
  // const [role, setRole] = useState(null);
  // const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(""); // State for nickname error message

  const roles = useSelector((state)=>state.auth.roles);
  const nickname = useSelector((state)=>state.auth.nickname);
  const userId = useSelector((state)=>state.auth.userId);

  const data ={
    roles,
    nickname,
    userId,
  }

  const handleCheckboxChange = (selectedRole) => {
    dispatch(setRoles(selectedRole));
  };

  const handleCardClick = (selectedRole) => {
    if (selectedRole === roles) {
      dispatch(setRoles(null));
    } else {
      dispatch(setRoles(selectedRole));
    }
  };

  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;
    
    if (newNickname.length > 10) {
      setNicknameError("닉네임의 최대 길이는 10자입니다.");
    } 
    else {
      dispatch(setNickname(newNickname));
      setNicknameError(""); // Clear the error message if the nickname is within the limit
    }
  };

  const handleSaveUser = async () => {
    try {
      if(nickname.length===0){
        alert("닉네임을 한글자 이상 입력하시오");
        return;
      }
      const response = await apis.get(`/user/duplication/${nickname}`);
      const { success, status } = response;
  
      if (status === 200 || success ==="true") {
        // 닉네임이 중복되지 않는 경우

          // 회원가입 성공한 경우
          apis.post("user/saveUser", data);
          alert("회원가입 성공");
          window.location.href = '/mypage';
        
      } else {
        // 닉네임이 중복된 경우 또는 서버에서 다른 오류가 발생한 경우
        alert("닉네임 중복"); // 서버에서 반환된 메시지를 표시
      }
    } catch (error) {
      // 중복 체크 요청 실패한 경우에 대한 처리를 여기에 추가할 수 있습니다.
      alert("중복된 닉네임 입니다.");
    }
  };

  return (
    <div className='register-container'>
      <div className='char2-container'>
        <div className='char2-text'>
          <p>회원가입</p>
        </div>
        <img src={char2} alt="char2" style={{ width: '200px' }} />
      </div>

      <div className="card" onClick={() => handleCardClick("ROLE_PARENT")}>
        <label className="card-label">
          부모
        </label>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={roles === "ROLE_PARENT"}
          onChange={() => handleCheckboxChange("ROLE_PARENT")}
        />
      </div>

      <div className="card" onClick={() => handleCardClick("ROLE_CHILD")}>
        <label className="card-label">
          자녀
        </label>
        <input
          type="checkbox"
          checked={roles === "ROLE_CHILD"}
          onChange={() => handleCheckboxChange("ROLE_CHILD")}
        />
      </div>

      <div className="card"> {/* 텍스트 입력 필드 카드 */}
        <label className="card-label">
          닉네임
          </label>
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          className="custom-input"
          maxLength="10" // Use "maxLength" attribute to limit the input length
        />
      </div>
      {nicknameError && <p className="nickname-error">{nicknameError}</p>} {/* Display error message */}
      <div className="role-button-container">
        
          <button className="role-button" onClick={handleSaveUser}>
            가입
          </button>
        
        <div className="background-box"></div>
      </div>
    </div>
  );
};

export default Register;