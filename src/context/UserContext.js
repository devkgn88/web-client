import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}


// isAuthenticated : 전역 상태 관리
function UserProvider ({children}){
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("access_token"),
  });
  
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );

}


function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, getUserInfo };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError){
  setError(false);
  setIsLoading(true);
  
  // 아이디와 비밀번호가 모두 입력된 경우
  if (!!login && !!password) {
    fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login, 
        password: password,
      }),
      credentials: "include",
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error("로그인 실패");
        }
        const data = await response.json();

        localStorage.setItem("access_token",data.accessToken);
        dispatch({ type: "LOGIN_SUCCESS" });

        setError(null);
        setIsLoading(false);
        history.push("/app/dashboard");
      })
      .catch(error => {
        console.error("로그인 에러 : ",error);
        setError(true);
        setIsLoading(false);
      });

    // 둘중에 하나라도 입력되지 않은 경우
  } else {
    setError(true);
    setIsLoading(false);
  }
}


function signOut(dispatch, history) {
  localStorage.removeItem("access_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

// fetch로 사용하던 코드를 fetchWithAuth 사용하기
async function fetchWithAuth(url, options={}){
  const token = localStorage.getItem('access_token');

  const authOptions = {
    ...options,
    headers:{
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  let response = await fetch(url, authOptions);

  if(response.status === 401){
    // accessToken 만료시 : refresh 시도
    const newAccessToken = await refreshAccessToken();
    if(newAccessToken){
      localStorage.setItem("access_token",newAccessToken);

      // 토큰 갱신 후 다시 요청
      const retryOptions = {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      };
      response = await fetch(url, retryOptions);
    } else{
      // 재발급 실패 -> 로그아웃 시키기
      localStorage.removeItem("access_token");
      window.location.href="/login";
    } 
  }
  return response;
}

// accessToken 재발급 함수
async function refreshAccessToken(){
  try{
    const response = await fetch("http://localhost:8081/api/refresh",{
      method:'POST',
      credentials:"include", // 서버가 HttpOnly 쿠키 기반으로 설정할 수 있도록
    });

    if(!response.ok){
      throw new Error("RefreshToken 재발급 실패");
    }

    const data = await response.json();
    return data.accessToken;
  }catch(error){
    console.error("AccessToken 재발급 에러 : ",error);
    return null;
  }
}

async function getUserInfo() {
  try {
    const response = await fetchWithAuth("http://localhost:8081/api/profile");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("네트워크 오류 발생:", error);
  }
}
