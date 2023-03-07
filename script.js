let userList = document.getElementById("userList");
let userName = document.getElementById("name");
let userPassword = document.getElementById("password");
let loginUserBtn = document.getElementById("loginUserBtn");
let logIn = document.getElementById("logIn");
const serverMassage = document.getElementById("serverMassage");
const saveUserBtn = document.getElementById("saveUserBtn");
const savenewUser = document.getElementById("savenewUser");
let newpassword = document.getElementById("newpassword");
let newname = document.getElementById("newname");

console.log(saveUserBtn);


/*---------------------- Plockar upp de sparade användarna Skriver ut sparade användarna i listan ---------------------------------------------*/ 

fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => {
    //console.log(data);
    printUsers(data);
});

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


/*----------------------Logga in användaren ------------------------------------------------------ */

let userId;
loginUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let sendUserData = {name: userName.value, password: userPassword.value};
    
   // logIn.reset();
    serverMassage.innerHTML = ""

 //   console.log(user);

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(sendUserData)
    })
    .then(res => res.json())
    .then(data => {
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
    userName.value = ""
    userPassword.value = ""
    
});

//inlogBtn


/* ----------------------------------- Spara den nya användaren ---------------------------------------- */

saveUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Called Handler");
    let user = {name: newname.value, password:newpassword.value};
    console.log(user);

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
    newname.value = ""
    newpassword.value = ""
})

