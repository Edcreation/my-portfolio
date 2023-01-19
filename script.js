let open = false; 
let wow = false;

function displayWow(){
  const w = document.getElementById("wowM")
  if (w.style.display === "flex") {
    w.style.display = "none"
  } else {
    w.style.display = "flex"
  }
}
window.onload = checkUser()
function popContact(x) {
  document.querySelector('#popcontact').style.display = "block";
  document.getElementById('popcontact').innerHTML = x
  setTimeout(() => {
    document.querySelector('#popcontact').style.display = "none";
  }, 2000);
}

function toggleNav(){
  var myImage = document.getElementById('ig');
  if(open==false){
    var mySrc = myImage.getAttribute('src');
    navUl = document.getElementById("actions");
    myImage.setAttribute ('src','./images/close.png');
      navUl.style.display="flex";
      //navUl.style.animation = 	"animation: slideInFromLeft .8s;"
      open = true;
    }else{
      myImage.setAttribute ('src','./images/open.png');
      navUl = document.getElementById("actions");
      //navUl.style.animation = 	"slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"
      navUl.style.display="none";
      open = false; 
    }
  
};
function toggleDashNav() {
  if(open==false){
    navUl = document.getElementById("dash-nav");
    navUl.style.display="flex";
    open = true;
}else{
      navUl = document.getElementById("dash-nav");
      navUl.style.display="none";
      open = false; 
}
}
//---------------------Messages Using Local Storage-----------------/
function getMessage() {
  let Messages = JSON.parse(localStorage.getItem("Messages") || "[]");
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const message = document.getElementById("msg").value;
  let id = Math.floor(Math.random() * 999);
  if (email === "" || name === "" || message === "") {
    popContact("Please Fill Out All Fields")
  } else {
    details = {
      id:id,
      email:email,
      name:name,
      message:message
    }
    console.log(details)
    Messages.push(details);
    window.localStorage.setItem("Messages", JSON.stringify(Messages));
    document.getElementById('frm').reset()
    popContact("Message Sent")
    
  }
  
}
/** ------------------- Authentication-----------*/
function createUser() {
  let Users = JSON.parse(localStorage.getItem("Users") || "[]")
  const users = JSON.parse(window.localStorage.getItem("Users") || "[]");
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const image = window.localStorage.getItem("tempImage")
  const password = document.getElementById('pass').value;
  function ValidateEmail(inputText)
  {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  if (email === "" || name === "" || password === "" ) {
    popContact("Please Fill out All Fields.")
  }
  else {
    if ( ValidateEmail(email) ) {
      if ( users.some(item => item.email === email)) {
        popContact("Email Already Exists.");
      }
      else {
        if (password.length < 5) {
          popContact("Password is Too Short")
        } else {
          const userData = {
              email: email,
              name: name,
              image: image,
              password: password,
          };
          Users.push(userData);
          localStorage.setItem('Users', JSON.stringify(Users));
          var element = document.getElementById("frm")
          element.reset()
          window.localStorage.removeItem("tempImage")
          popContact("Account Created.")
          
        }
      }
    } else {
      popContact("Invalid Email")
    }

  }
  

}
function loginUser() {
  let users = JSON.parse(localStorage.getItem("Users") || "[]")
  let arr = JSON.parse(localStorage.getItem("Users") || "[]")
  const image = "./images/dp.jpg"
  const email = document.getElementById('email').value
  const pass = document.getElementById('pass').value
  var x = users.findIndex(obj => obj.email == email);
  const lastIndexOfName = name => {
    let index = [...users].reverse().findIndex(obj => obj.password == pass);
    return index >= 0 ? arr.length - 1 - index : index;
  }
  var y = lastIndexOfName(pass);
  if (email === "admin@mail.com" && pass=== "pass") {
    window.location.href = "./dashboard/dashboard.html"
    const admin = {
      email : "admin@mail.com",
      name: "Admin",
      password: "pass",
      image : image
    }
    window.localStorage.setItem("tempLog", JSON.stringify(admin))
  } else {
    if (email === "" || pass === "") {
      popContact("Please Fill out All Fields");
    }
    else {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == pass) {
          window.localStorage.setItem("tempLog", JSON.stringify(users[i]))
          let link = "./index.html"
          window.location.href = link
          
          break;
        }
      }
      popContact("Invalid Credintials")
    }
  }
}
function checkUser() {
  if (localStorage.getItem("tempLog")) {
    wow = true
  }
  else{
    wow = false
  }
}
function logOut() {
  window.localStorage.removeItem("tempLog")
  wow = false
  location.reload()
}
/**--------------------------Blogs Using Local Storage------------------------------- */

var quill = new Quill('#content', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
function createBlog() {
  let Blogs = JSON.parse(localStorage.getItem("Blogs") || "[]");
  const title = document.getElementById('title').value
  const image = window.localStorage.getItem("tempImage")
  const content = quill.root.innerHTML
  //-----------Form Validation----------------
  if (title === "" || content === "" || image === "") {
    popContact("Please Fill out All Fields")
  } else {
    if (title.length > 500) {
      popContact(" Title too Long ")
    } else {
      const blogData = {
        title: title,
        image: image,
        content: content,
        likeCount: 0,
        comments: [],
        liked: [],
        date: new Date().toLocaleDateString()
      }
      Blogs.push(blogData);
      localStorage.setItem('Blogs', JSON.stringify(Blogs));
      var element = document.getElementById("frm")
      element.reset()
      popContact("Blog Created")
      window.localStorage.removeItem("tempImage")
    } 
  }
}

function deleteAllBlogs() {
  let Bloga = JSON.parse(localStorage.getItem("Blogs") || "[]");
  Bloga = []
  window.localStorage.removeItem("Blogs");
  location.reload();
}
function deleteBlog(m) {
  let Blogs = JSON.parse(localStorage.getItem("Blogs") || "[]");
  let Blogsa = JSON.parse(localStorage.getItem("Blogs"));
  console.log(m)
  if (m > -1) { // only splice array when item is found
      Blogsa.splice(m, 1); // 2nd parameter means remove one item only
      window.localStorage.setItem("Blogs", JSON.stringify(Blogsa));
      location.reload()
  }
}

function addComment(id) {
  let Blogs = JSON.parse(localStorage.getItem("Blogs"));
  let users = JSON.parse(localStorage.getItem("Users"));
  let comment = document.getElementById("ccontent").value
  let cname = JSON.parse(localStorage.getItem("tempLog")).name
  let image = JSON.parse(localStorage.getItem("tempLog")).image
  if (users.some(item => item.name === cname) || cname == "Admin") {
    const tempComment = {
      id : id,
      name : cname,
      comment : comment,
      image: image,
      date: Date.now()
    }
    console.log(cname)
    Blogs[id].comments.push(tempComment);
    localStorage.setItem('Blogs', JSON.stringify(Blogs));
    popContact("Comment Added")
    setTimeout(() => {
      window.location.reload()
    }, 500);
  } else {
    //popContact("Please Create Account Before Commenting.")
    // alert("Please Create Account Before Commenting.")
    popContact("Please Create Account Before Commenting.")
  }



}

function getLikes(x) {
  if (wow === true) {
    if (x > -1) {
      let Blogsl = JSON.parse(localStorage.getItem("Blogs"));
      let id = JSON.parse(localStorage.getItem("tempLog")).email
      let likes = Blogsl[x].likeCount;
        if (Blogsl[x].liked.length === 0) {
          likes++
          Blogsl[x].likeCount = likes
          Blogsl[x].liked.push(id)
          localStorage.setItem('Blogs', JSON.stringify(Blogsl));
          location.reload()
        }
        else {

            if ( Blogsl[x].liked.some(item => item == id) ) {
              function removeItemAll(arr, value) {
                var i = 0;
                while (i < arr.length) {
                  if (arr[i] === value) {
                    arr.splice(i, 1);
                  } else {
                    ++i;
                  }
                }
                return arr;
              }
              likes--
              Blogsl[x].likeCount = likes
              const arr = removeItemAll(Blogsl[x].liked, id)
              console.log(arr)
              localStorage.setItem('Blogs', JSON.stringify(Blogsl));
              location.reload()
            }
            else if ( Blogsl[x].liked.some(item => item != id)  ) {
              likes = likes + 1
              Blogsl[x].likeCount = likes
              Blogsl[x].liked.push(id)
              localStorage.setItem('Blogs', JSON.stringify(Blogsl));
              location.reload()
            }
        }
    }
  }
}
function navigate(n) {
  let link = "./blog-detail.html?id=" + n
  window.location.href = link;
  console.log(n)
}
function displayComments(id) {
  com = document.getElementById("com")
  let Blogsd = JSON.parse(localStorage.getItem("Blogs")).sort((a, b) => (a > b ? -1 : 1));
  let output = " <div class=\"comment\">"  + " <div class=\"com-name\"> " + "</div> "
          + " <div class=\"com-content\"> " + "</div> " +
          "<div class=\"com-date\">09/01/2023</div>" + " </div>"
  if (Blogsd[id].comments.length < 1) {
    output = "No Comments"
  } else {
    
  }
  for(let i = Blogsd[id].comments.length; i > 0; i--)
  {
    let m = new Date(Blogsd[id].comments[i-1].date)
    output += " <div class=\"comment\">"  + " <div class=\"com-name\"> "+ "<img src="+ Blogsd[id].comments[i-1].image + " alt=\"image \">" + Blogsd[id].comments[i-1].name +  "</div> "
    + " <div class=\"com-content\"> " + Blogsd[id].comments[i-1].comment + "</div> " +
    "<div class=\"com-date\">" + m.toDateString() + "</div> </div>"
  }
  //console.log(output)
  com.innerHTML = output;
  
}


function showLoginButton() {
  const p = document.getElementById("profilePic")
  const l = document.getElementById("loginbutton")
  if ( wow === false) {
    p.style.display = "none"
    l.style.display = "block"
  }
}
function che() {
  const ano = JSON.parse(window.localStorage.getItem("tempLog"))
  if (wow === true && ano.email === "admin@mail.com" && ano.password === "pass") {
  }
  else {
    const link = "../index.html"
    window.location.href = link
  }
}
function tologin() {
  if (!localStorage.getItem("tempLog")) {
    window.location.href = "./login.html"
  }
}
function SignUp(m) {
window.location.href = "./signup.html"
}
function toSignUp() {
  if (!localStorage.getItem("tempLog")) {
    window.location.href = "./signup.html"
  }
}
function toProfile() {
  window.location.href = "./profile.html"
}

function changeUser() {
  let Users = JSON.parse(localStorage.getItem("Users") || "[]")
  const email = JSON.parse(window.localStorage.getItem("tempLog")).email;
  //const id = Users.indexOf(window.localStorage.getItem("Users"))
  var id = Users.findIndex(obj => obj.email == email);
  const name = document.getElementById('name').value;
  const image = window.localStorage.getItem("tempImage")
  const password = document.getElementById('pass').value;
  const password1 = document.getElementById('pass1').value;
  const mypassword = JSON.parse(window.localStorage.getItem("tempLog")).password
  if (email === "" || name === "" || password === "" ) {
    popContact("Please Fill out All Fields.")
  }
  else {
    if (password != mypassword ) {
      popContact("Old Password Is Wrong")
    } else {
      if (password1.length < 5) {
        popContact("New Password is Too Short")
      } else {
        const userData = {
            email: email,
            name: name,
            image: image,
            password: password1,
        };
        if (id > -1) { // only splice array when item is found
          Users.splice(id, 1); // 2nd parameter means remove one item only
        }
        Users.push(userData);
        localStorage.setItem('Users', JSON.stringify(Users));
        var element = document.getElementById("frm")
        element.reset()
        window.localStorage.removeItem("tempImage")
        popContact("Profile Changed.")
        setTimeout( logOut() , 1000);
        
      }

    }
    }


}
function userToTable(m) {
  const table = document.getElementById("table")
  const users = JSON.parse(window.localStorage.getItem("Users"))
  for (let i = 0; i < users.length; i++) {
    const tr = document.createElement("tr");
    const tdimage = document.createElement("img");
    const tdname = document.createElement("td");
    const tdemail = document.createElement("td");
    tdimage.src = users[i].image;
    tr.appendChild(tdimage);
    tr.appendChild(tdname);
    tr.appendChild(tdemail);
    table.appendChild(tr);
    tdname.innerText = users[i].name;
    tdemail.innerText = users[i].email;
  }
}

