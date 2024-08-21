//global variable decleration
let userInfo = "";
let allBData = [];
let allInHData = [];
let allArchData = [];
let allCashData = [];
let allCashArchData = [];
let user;
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextArea = bookingForm.querySelector("textarea");
let inHouseForm = document.querySelector(".inhouse-form");
let allInHInput = inHouseForm.querySelectorAll("input");
let InHTextArea = inHouseForm.querySelector("textarea");
let closeBtn = document.querySelectorAll(".btn-close");
let bListTbody = document.querySelector(".booking-list");
let inHListTbody = document.querySelector(".inHouse-list");
let archiveTbody = document.querySelector(".archive-list");
let bRegisterBtn = document.querySelector(".b-register-btn");
let inHRegBtn = document.querySelector(".in-house-reg-btn");
let allTabBtn = document.querySelectorAll(".tab-btn");
let searchEl = document.querySelector(".search-input");
let cashairBtn = document.querySelector(".cashair-tab");
let cashierTab = document.querySelector("#cashair");
let bookingTab = document.querySelector("#booking");
let cashierForm = document.querySelector(".cashier-form");
let allCInput = cashierForm.querySelectorAll("input");
let cashBtn = document.querySelector(".cash-btn");
let cashierTbody = document.querySelector(".cashair-list");
let cashTotal = document.querySelector(".total");
let closeCashierBtn = document.querySelector(".close-cashier-btn");
let cashArchTbody = document.querySelector(".cashier-arch-list");
let cashArchTotal = document.querySelector(".arch-total");
let allPrintBtn = document.querySelectorAll(".print-btn");
let archPrintBtn = document.querySelector(".arch-print-btn");
let cashierTabPan = document.querySelector(".cashier-tab-pan");
let casheirArchPrintBtn = document.querySelector(".fa-print");
let allTotalBtn = document.querySelectorAll(".total-btn");
let showBRoomsEl = document.querySelector(".show-booking-rooms");
let showHRoomsEl = document.querySelector(".show-inhouse-rooms");

//check user is login or not
if (sessionStorage.getItem("userSession") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("userSession"));
// console.log(userInfo);
navBrand.innerHTML = userInfo.hotelname;
user = userInfo.email.split("@")[0];
// console.log(user);

// Print coding
for (let btn of allPrintBtn) {
  btn.onclick = () => {
    window.print();
  };
}

archPrintBtn.onclick = () => {
  cashierTabPan.classList.add("d-none");
  casheirArchPrintBtn.classList.add("no-print");
  window.print();
};
closeBtn[3].onclick = () => {
  cashierTabPan.classList.remove("d-none");
};


const checkRooms = (element) => {
  if (Number(userInfo.totalroom) < Number(element.value)) {
    swal(
      "Warning",
      `Total ${userInfo.totalroom} rooms is availible in the hotel`,
      "warning"
    );
    element.value = userInfo.totalroom;
  }
  
   
};
allBInput[2].oninput = (e) => {
  checkRooms(e.target);
};
allInHInput[2].oninput = (e) => {
  checkRooms(e.target);
};


// getting data from local storege
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};
allBData = fetchData(user + "_allBData");
allInHData = fetchData(user + "_allInHData");
allArchData = fetchData(user + "_allArchData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");
//show total
const showTotal = () => {
//   console.log(allBData);
  allTotalBtn[0].innerText = "Total Booking = " + allBData.length;
  allTotalBtn[1].innerText = "Total InHouse = " + allInHData.length;
  allTotalBtn[2].innerText = "Total Archieve = " + allArchData.length;
};
showTotal();
console.log(allBData)

// format date function
function formatDate(data, isTime) {
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let time = date.toLocaleTimeString();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
}

// making the above code dynamic to use it for all registration


const registration = (textArea = null, allInput, array, key) => {
  let data = {
    notice: textArea && textArea.value,
    inHouse: false,
    createdAt: new Date(),
  };
  for (let el of allInput) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  // here we need to save data by the name of user
         
        array.unshift(data);
        localStorage.setItem(key, JSON.stringify(array));
        swal("Well Done!", "Booking Success", "success");
        bookingForm.reset("");

  // closeBtn.click();
  // showBookingData();
  
};

// delete coding
function deletFunc(element, array, key) {
  let allDelBtn = element.querySelectorAll(".del-btn");
  allDelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          array.splice(index, 1);

          localStorage.setItem(key, JSON.stringify(array));
          ShowData(element, array, key);
          showInhouseRooms();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  });
}

//checkIn and CheckOut Coding
function checkInAndCheckOut(element, array, key) {
  let allCheckBtn = element.querySelectorAll(".check-btn");
  allCheckBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      let data = array[index];
      array.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(array));
      if (tmp == "allBData") {
        allInHData.unshift(data);
        localStorage.setItem(user + "_allInHData", JSON.stringify(allInHData));
        ShowData(element, array, key);
        showBookingRooms();
        showInhouseRooms();
      } else if (tmp == "allArchData") {
        allBData.unshift(data);
        localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
        ShowData(element, array, key);
        showBookingRooms();
        showInhouseRooms();
      } else {
        allArchData.unshift(data);
        localStorage.setItem(
          user + "_allArchData",
          JSON.stringify(allArchData)
        );
        ShowData(element, array, key);
        showInhouseRooms();
        showInhouseRooms();
      }
    };
  });
}

//update data
function updateDataFunc(element, array, key) {
  let allEditBtn = element.querySelectorAll(".edit-btn");
  allEditBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      tmp == "allBData" ? bRegisterBtn.click() : inHRegBtn.click();
      let allBtn =
        tmp == "allBData"
          ? bookingForm.querySelectorAll("button")
          : inHouseForm.querySelectorAll("button");
      allBtn[0].classList.add("d-none");
      allBtn[1].classList.remove("d-none");

      let allInPut =
        tmp == "allBData"
          ? bookingForm.querySelectorAll("input")
          : inHouseForm.querySelectorAll("input");
      let textarea =
        tmp == "allBData"
          ? bookingForm.querySelector("textarea")
          : inHouseForm.querySelector("textarea");

      // let tr=btn.parentElement.parentElement;
      // let allTd=tr.querySelectorAll("td");
      // let i;
      // // for(i=1;i<allTd.length-2;i++)
      // // {
      // //     allBInput[i].value=allTd[i].innerText;
      // // }
      // allBInput[0].value=allTd[3].innerText
      // allBInput[1].value=allTd[1].innerText
      // allBInput[2].value=allTd[2].innerText
      // allBInput[3].value=allTd[6].innerText
      // allBInput[4].value=allTd[4].innerText
      // allBInput[5].value=allTd[5].innerText
      // allBInput[6].value=allTd[7].innerText
      // allBInput[7].value=allTd[8].innerText
      // bTextArea.value=allTd[9].innerText

      let obj = array[index];
      allInPut[0].value = obj.fullName;
      allInPut[1].value = obj.location;
      allInPut[2].value = obj.roomNo;
      allInPut[3].value = obj.totalPeople;
      allInPut[4].value = obj.checkIn;
      allInPut[5].value = obj.checkOut;
      allInPut[6].value = obj.price;
      allInPut[7].value = obj.mobile;
      textarea.value = obj.notice;
      allBtn[1].onclick = () => {
        let formData = {
          notice: textarea.value,
          createdAt: new Date(),
        };
        for (let el of allInPut) {
          let key = el.name;
          let value = el.value;
          formData[key] = value;
        }
        array[index] = formData;
        allBtn[0].classList.remove("d-none");
        allBtn[1].classList.add("d-none");
        tmp == "allBData" ? bookingForm.reset("") : inHouseForm.reset("");
        tmp == "allBData" ? closeBtn[0].click() : closeBtn[1].click();
        localStorage.setItem(key, JSON.stringify(array));
        ShowData(element, array, key);
      };
    };
  });
}

//start booking store coding


let checkRNo=allBData.find((data)=>data.roomNo==allBInput[2].value);
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  // let data={
  //     notice: bTextArea.value,
  //     createdAt: new Date()
  // };
  // for (let el of allBInput)
  // {
  //     let key =el.name;
  //     let value= el.value;
  //     data[key]=value;
  // }
  // // here we need to save data by the name of user
  // allBData.push(data);
  // localStorage.setItem(user+"_allBData",JSON.stringify(allBData));
  // swal("Well Done!","Booking Success","success");
 
      registration(bTextArea, allBInput, allBData, user + "_allBData");
      bookingForm.reset("");
      closeBtn[0].click();
      ShowData(bListTbody, allBData, user + "_allBData");
      showTotal();
      showBookingRooms();
    
  
      
    
 
};

//start cashair store coding
cashierForm.onsubmit = (e) => {
  e.preventDefault();

  registration(null, allCInput, allCashData, user + "_allCashData");
  cashierForm.reset("");
  closeBtn[2].click();
  showCashierFunc();
};
// booking inhouse data
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registration(InHTextArea, allInHInput, allInHData, user + "_allInHData");
  inHouseForm.reset("");
  closeBtn[1].click();
  ShowData(inHListTbody, allInHData, user + "_allInHData");
  showTotal();
  showInhouseRooms();
};

//logout coding:
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Logging Out...";
  setTimeout(() => {
    sessionStorage.removeItem("userSession");
    window.location = "../index.html";
  }, 2000);
};
const searchFunc = () => {
  let value = searchEl.value.toLowerCase();
  let tableEl = document.querySelector(".tab-content .search-pane.active");
  let tr = tableEl.querySelectorAll("tbody tr");
  for (let el of tr) {
    let td = el.querySelectorAll("td");
    let sr = td[0].innerText;
    let location = td[1].innerText;
    let roomNo = td[2].innerText;
    let fullName = td[3].innerText;
    let mobile = td[8].innerText;
    let price = td[7].innerText;
    if (sr.indexOf(value) != -1) {
      el.classList.remove("d-none");
      // el.style.display="";
    } else if (location.toLocaleLowerCase().indexOf(value) != -1) {
      el.style.display = "";
    } else if (roomNo.toLocaleLowerCase().indexOf(value) != -1) {
      el.style.display = "";
    } else if (fullName.toLocaleLowerCase().indexOf(value) != -1) {
      el.style.display = "";
    } else if (mobile.toLocaleLowerCase().indexOf(value) != -1) {
      el.style.display = "";
    } else if (price.toLocaleLowerCase().indexOf(value) != -1) {
      el.style.display = "";
    } else {
      el.classList.add("d-none");
      // el.style.display="none";
    }
  }
};
//search  coding
searchEl.oninput = () => {
  searchFunc();
};

//refresh ui data
for (let btn of allTabBtn) {
  btn.onclick = () => {
    ShowData(bListTbody, allBData, user + "_allBData");
    ShowData(inHListTbody, allInHData, user + "_allInHData");
    ShowData(archiveTbody, allArchData, user + "_allArchData");
    showTotal();
  };
}

//show booking rooms
function showBookingRooms(){
  showBRoomsEl.innerHTML = "";
  allBData.forEach((item, index) =>{
    // console.log(item);
    showBRoomsEl.innerHTML += `
    <div class="card no-print col-md-2 px-0 text-center">
        <div class="card-header  bg-secondary text-white fw-bold">
        ${item.roomNo}
        </div>
        <div class="card-body bg-info text-white fw-bold">
        <p>${formatDate(item.checkIn)}</p>
        <p>To</p>
        <p>${formatDate(item.checkOut)}</p>
        </div>
    </div>
    `
  });
};
showBookingRooms();

//show inhouse rooms
function showInhouseRooms(){
    showHRoomsEl.innerHTML = "";
    allInHData.forEach((item, index) =>{
     
      showHRoomsEl.innerHTML += `
      <div class="card no-print col-md-2 px-0 text-center">
          <div class="card-header  bg-secondary text-white fw-bold">
          ${item.roomNo}
          </div>
          <div class="card-body ">
            <div class="card-body ">
                <img src="${item.inHouse ? "../img/dummy.jpg" : "../img/lock.jpg"}" class="w-50" >
            </div>
        </div>
        <div class="card-footer">
            <button class="in-btn action-btn btn text-white">
                In
            </button>
            <button class="out-btn action-btn btn text-white">
                Out
            </button>
        </div>
      </div>
      `
    });
    //in coding
    let allInBtn=showHRoomsEl.querySelectorAll(".in-btn");
    let allOutBtn=showHRoomsEl.querySelectorAll(".out-btn");
    allInBtn.forEach((btn,index)=>{
        btn.onclick=()=>{
            let data=allInHData[index];
            data.inHouse=true;
            allInHData[index]=data;
            localStorage.setItem(user+"_allInHData",JSON.stringify(allInHData));
            showInhouseRooms();
        }
    })
    //out coding
    allOutBtn.forEach((btn,index)=>{
        btn.onclick=()=>{
            let data=allInHData[index];
            data.inHouse=false;
            allInHData[index]=data;
            localStorage.setItem(user+"_allInHData",JSON.stringify(allInHData));
            showInhouseRooms();
        }
    })

  };
  showInhouseRooms();

//show cash
function showCashierFunc() {
  cashierTbody.innerHTML = "";
  let totalAmount = 0;
  allCashData.forEach((item, index) => {
    totalAmount += Number(item.amount); //we can use number function or use another + to convert the data to number from string ( +item.amount)
    cashierTbody.innerHTML += `
         <tr>
            <td class="text-nowrap">${index + 1}</td>
            <td class="text-npwrap">${item.roomNo}</td>
            <td class="text-npwrap">${item.cashair}</td>
            <td class="text-npwrap">${formatDate(item.createdAt, true)}</td>
            <td class="text-npwrap">${item.amount}</td>
        </tr>
        `;
  });

  cashTotal.innerHTML = "<i class='fa fa-usd'></i> " + totalAmount;
}
// show archive cash
function showCashArchFunc() {
  cashArchTbody.innerHTML = "";
  let totalAmount = 0;
  allCashArchData.forEach((item, index) => {
    totalAmount += +item.total; //we can use number function or use another + to convert the data to number from string ( +item.amount)
    // console.log(totalAmount);
    cashArchTbody.innerHTML += `
         <tr>
            <td class="text-nowrap">${index + 1}</td>
            <td class="text-nowrap">${item.cashierName}</td>
            <td class="text-nowrap">${formatDate(item.createdAt, true)}</td>
            <td class="text-nowrap">${item.total}</td>
        </tr>
        `;
  });
  cashArchTotal.innerHTML =
    "<i class='fa fa-usd text-danger'></i> " + totalAmount;
}
showCashArchFunc();
// show data coding
function ShowData(element, array, key) {
  let tmp = key.split("_")[1];
  element.innerHTML = "";
  array.forEach((item, index) => {
    element.innerHTML += `
      <tr>
                            <td  class="text-nowrap no-print">${index + 1}</td>
                            <td  class="text-nowrap">${item.location}</td>
                            <td  class="text-nowrap">${item.roomNo}</td>
                            <td  class="text-nowrap">${item.fullName}</td>
                            <td  class="text-nowrap">${item.checkIn}</td>
                            <td  class="text-nowrap">${item.checkOut}</td>
                            <td  class="text-nowrap">${item.totalPeople}</td>
                            <td  class="text-nowrap">${item.price}</td>
                            <td  class="text-nowrap">${item.mobile}</td>
                            <td  class="text-nowrap">${item.notice}</td>
                            <td  class="text-nowrap no-print">${formatDate(
                              item.createdAt,
                              true
                            )}</td>
                            <td class="text-nowrap no-print">
                                <button class=" ${
                                  tmp == "allArchData" && "d-none"
                                } btn btn-primary text-white p-0 px-1 edit-btn "><i class="fa fa-edit"></i></button>
                                <button class="btn btn-info text-white p-0 px-1 check-btn"><i class="fa fa-check"></i></button>
                                <button class=" btn btn-danger text-white p-0 px-1 del-btn"><i class="fa fa-trash"></i></button>
                            </td>
        </tr>
      
      `;
  });
  deletFunc(element, array, key);
  updateDataFunc(element, array, key);
  checkInAndCheckOut(element, array, key);
}
//cashier coding
cashBtn.onclick = () => {
  allCInput[2].value = sessionStorage.getItem("c_name");
};
cashairBtn.onclick = () => {
  if (sessionStorage.getItem("c_name") == null) {
    let name = window.prompt("Enter your name");
    if (name) {
      sessionStorage.setItem("c_name", name);
    } else {
      allTabBtn[0].classList.add("active");
      cashairBtn.classList.remove("active");
      cashierTab.classList.remove("active");
      bookingTab.classList.add("active");
    }
  } else {
    allCInput[2].value = sessionStorage.getItem("c_name");
  }
};

//close cashier
closeCashierBtn.onclick = () => {
  
  if (allCashData.length > 0) {
    let data = {
      cashierName: sessionStorage.getItem("c_name"),
      total: cashTotal.innerText,
      createdAt: new Date(),
    };
    // console.log(allCashArchData);
    allCashArchData.push(data);
    allCashData = [];
    localStorage.removeItem(user + "_allCashData");
    localStorage.setItem(
      user + "_allCashArchData",
      JSON.stringify(allCashArchData)
    );
    sessionStorage.removeItem("c_name");
    showCashierFunc();
  } else {
    swal("Warning", "There is no Cash to close", "warning");
  }
};
ShowData(bListTbody, allBData, user + "_allBData");
ShowData(inHListTbody, allInHData, user + "_allInHData");
ShowData(archiveTbody, allArchData, user + "_allArchData");
showCashierFunc(cashierTbody, allCashData, user + "_allCashData");
