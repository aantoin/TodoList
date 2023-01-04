import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {

  

  type UserData = {
    id: number,
    name: string
  }

  const authenticated = ref(false);
  const loginLoading = ref(false);
  const loginStatus = ref(0);
  const token = ref('')
  
  const register = (username: string, password: string) => {
    const fetchLogin = async () => {
      fetch('http://127.0.0.1:8000/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password})
      })
        .then((res) => {
          console.log(res.status);
          if (res.status == 201) {
            login(username, password);
          }
        })
    };
    fetchLogin();
  }
  const login = (username: string, password: string) => {
    loginLoading.value = true;
    const fetchLogin = async () => {
      fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(username + ":" + password),
        },
        body: JSON.stringify({})
      })
        .then((res) => {
          loginStatus.value = res.status;
          if (res.status === 200) {
            res.json().then((data) => {
              try {
                localStorage.setItem('token', data.token);
              } catch (err) {
                console.log(err);
              }
              token.value = data.token;
              authenticated.value = true;
              loginLoading.value = false;
            })
          }
          else {
            loginLoading.value = false;
          }
        })
    };
    fetchLogin();
  }
  const logout = () => {
    const fetchLogout = async () => {
      fetch('http://127.0.0.1:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token.value,
        },
        body: JSON.stringify({})
      })
        .then((res) => {
        })
    };
    fetchLogout();
    token.value = '';
    authenticated.value = false;
    try {
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  }

  const refreshToken = () => {
    if (!token.value) {
      try {
        token.value = localStorage.getItem('token') || "";
      }
      catch (err) {
        console.log(err);
      }
    }
    if (token.value) {
      try {
        localStorage.setItem('token', token.value);
      } catch (err) {
        console.log(err);
      }
      const refreshToken = async () => {
      fetch('http://127.0.0.1:8000/auth/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token.value,
        },
        body: JSON.stringify({})
      })
        .then((res) => {
          if (res.status == 200) authenticated.value = true;
          else logout();
        })
      };
      refreshToken();
    }
  }

  return { authenticated, loginLoading, loginStatus, token, register, login, logout, refreshToken };
});
