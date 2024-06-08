var urlName = document.getElementById("urlName");
var urlWebsite = document.getElementById("urlWebsite");
var row = document.getElementById("row");
var urlList;
// localStorage.clear();

if (localStorage.getItem("link") !== null) {
  urlList = JSON.parse(localStorage.getItem("link"));
  displayUrlList();
} else {
  urlList = [];
}

// create url
function addUrl() {
    if(validName() && ValidUrl()){
  urls = {
    siteName: urlName.value,
    siteLink: urlWebsite.value,
  };
  urlList.push(urls);
  localStorage.setItem("link", JSON.stringify(urlList));
  displayUrlList();
  clear()
}} 

function clear(){
    urlName.value ='';
    urlWebsite.value ='';
}


function displayUrl(p, index) {
  row.innerHTML += `
    <div class="row text-center border-top p-2">
        <div class="col-lg-3 mt-2  ">
            <div>${index + 1}</div>
        </div>
        <div class="col-lg-3 mt-2 p-2">
             <div>${p.siteName}</div>
        </div>
     <div class="col-lg-3 mt-2 p-2">
     <button onclick='visitUrl(${index})' class="btn btn-outline-success"><i class="fa-regular fa-eye pe-2"></i><span>visit</span></button>
     </div>
         <div class="col-lg-3 mt-2 p-2">
             <button onclick='deleteUrl(${index})' class="btn btn-outline-danger"><i class="fa-regular fa-trash-can pe-2"></i><span>Delete</span></button>
        </div>
    </div>
    `;
}
function displayUrlList() {
  row.innerHTML = "";
  for (var i = 0; i < urlList.length; i++) {
    displayUrl(urlList[i], i);
  }
}

function visitUrl(index) {
  window.open(urlList[index].siteLink, "_blank");
}

function deleteUrl(i) {
  urlList.splice(i, 1);
  localStorage.setItem("link", JSON.stringify(urlList));
  displayUrlList();
}

function ValidUrl() {
  var regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  var isValid = regex.test(urlWebsite.value);
  urlWebsite.classList.remove("is-valid", "is-invalid");

  if (isValid) {
    console.log("matched");
    urlWebsite.classList.add("is-valid");
    document.getElementById("alert").classList.replace( "d-block","d-none");
    return true;
  } else {
    console.log("not matched");
    urlWebsite.classList.add("is-invalid");
    document.getElementById("alert").classList.replace("d-none", "d-block");
    return false;
  }
}

function validName(){
    var regex = /[a-z]{3,}/;
    var isValid = regex.test(urlName.value);
    urlName.classList.remove("is-valid", "is-invalid");
  
    if (isValid) {
        console.log("matched");
        urlName.classList.add("is-valid");
        document.getElementById("alert").classList.replace( "d-block","d-none");
        return true;
      } else {
        
        urlName.classList.add("is-invalid");
        document.getElementById("alert").classList.replace("d-none", "d-block");
        return false;
        
      }
}