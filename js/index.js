//all global variables
let allUserInfo=[];
let regForm=document.querySelector(".reg-form");
let allInput=regForm.querySelectorAll("input");
let regBtn=regForm.querySelector("button");
let loginForm=document.querySelector(".login-form");
let allInputLogin=loginForm.querySelectorAll("input");
console.log(allInputLogin)
let loginBtn=loginForm.querySelector("button");

if(localStorage.getItem("allUserInfo")!=null){
    allUserInfo=JSON.parse(localStorage.getItem("allUserInfo"));
}
console.log(allUserInfo);
//registration coding
regForm.onsubmit=(e)=>{
e.preventDefault();
let checkEmail = allUserInfo.find((data)=>data.email == allInput[4].value)

// push input data to array:
    if(checkEmail ==undefined){
        let data={};
        for(let el of allInput)
        {
            let key=el.name;
            data[key]=el.value;
            
        }
        regBtn.innerText = "Processing..."
        setTimeout(() => {
            regBtn.innerText = "Register"
            allUserInfo.push(data);
            localStorage.setItem("allUserInfo",JSON.stringify(allUserInfo));
            swal("Good Job","Your Data is saved successfully","success");
        }, 1500);

    }else
    {
        swal("Failed","Email already exist","warning");
    }

    
}


  // let data={
    //     // fullname:allInput[0].value,
    //     // hotelname:allInput[1].value,
    //     // totalroom:allInput[2].value,
    //     // mobile:allInput[3].value,
    //     // email:allInput[4].value,
    //     // password:allInput[5].value
        
    // }

    //Login coding:

loginForm.onsubmit=(e)=>{
    e.preventDefault();
    if(allInputLogin[0].value != "")
    {
       if(allInputLogin[1].value !="")
        {
            //check email in your database
            let checkEmail=allUserInfo.find((data)=>{
                return data.email==allInputLogin[0].value;
            });
            if(checkEmail!=undefined)
            {
                // match password
                if(checkEmail.password == allInputLogin[1].value)
                {
                   loginBtn.innerText="Please Wait...";
                  setTimeout(()=>{
                    loginBtn.innerText="Login";
                    window.location="profile/profile.html"
                    //setting security session
                    checkEmail.password=null;
                    sessionStorage.setItem("userSession",JSON.stringify(checkEmail));
                  },1500)
                }
                else
                {
                    swal("Warning","Wrong password","warning");
                }
            }
            else 
            {
                swal("Warning","Wrong User Email","warning");
            }
       }
       else
       {
        swal("Warning","Password is empty","warning");
       }
    }
    else
    {
        swal("Warning","Email is empty","warning");
    }
}
    