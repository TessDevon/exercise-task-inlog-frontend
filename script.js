//let userList = document.getElementById("userList");
//let newUser = document.getElementById("newUser");
let userName = document.getElementById("name");
let userPassword = document.getElementById("password");
let loginUserBtn = document.getElementById("loginUserBtn");
let logIn = document.getElementById("logIn");
const serverMassage = document.getElementById("serverMassage");

fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => {
    //console.log(data);
    printUsers(data);
});
let userId;
loginUserBtn.addEventListener("click", (event) => {

    let sendUserData = {name: userName.value, password: userPassword.value};
    event.preventDefault();
    logIn.reset();
    serverMassage.innerHTML = ""

 //   console.log(user);

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(sendUserData)
    })
    .then(res => res.json())
    .then(data => {
       // printUsers(data);
        console.log(data);
        userId = data;
        console.log(userId)
        const serverMassage = document.getElementById("serverMassage");
        const okMessege = document.createTextNode("Välkommen till vår webshop!");
        serverMassage.style.color = "green";
        serverMassage.appendChild(okMessege);
    })  
    .catch((error) => {
        console.error("Error:", error);
        const serverMassage = document.getElementById("serverMassage");

        const errorMessege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        serverMassage.style.color = "red";
        serverMassage.appendChild(errorMessege);
        
        const element = document.getElementById("logIn");
        element.appendChild(serverMassage);

        /*
        const messegeP = document.createElement("p");
        const messege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        messegeP.appendChild(messege);
        const loggIn = document.getElementById("loggIn");
        document.body.insertBefore(messegeP, currentDiv);
        */
    });
});

//inlogBtn

/*
function printUsers(users) {
   // console.log(users);

   userList.innerHTML = ""

    users.map(user => {
        let li = document.createElement("li")
        li.id = user.id;
        li.innerText = user.name;
        userList.appendChild(li);
    })
}

saveUserBtn.addEventListener("click", () => {
    let user = {name: newUser.value};
 //   console.log(user);

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        printUsers(data);
        console.log(data);
    });
})
*/
