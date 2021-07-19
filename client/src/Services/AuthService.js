const login = (user) => {
        return (fetch("http://localhost:5000/user/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 401){
                return res.json().then(data => data)
            } else {
                return {isAuthenticated: false, user: {username: "", role: ""}};
            }
        }))
    };

const register = (user) => {
        return fetch("http://localhost:5000/user/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data)
    };

const logout = () => {
        return fetch("http://localhost:5000/user/logout")
                .then(res => res.json())
                .then(data => data);
    };

const isAuthenticated = () => {
        return fetch("http://localhost:5000/user/authenticated")
                .then(res => {
                    // if response status is not 401, then it's my own status
                    // passport automatically sends 401 status if not authenticated
                    // console.log("isAuthenticated Error");
                    if (res.status !== 401) {
                        console.log(res);
                        console.log("is not 401");
                        return res.json().then(data => data);
                    } else {
                        console.log(res);
                        console.log("is 401");
                        return { isAuthenticated: false, user: {username: "", role: ""}};
                    }
                })
    }

const AuthService = {
    login, register, logout, isAuthenticated
}

export default AuthService;