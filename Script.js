var Website_Name = document.getElementById("WebName");
var Website_URL = document.getElementById("WebURL");
var Website_List = []


if(localStorage.getItem("Website_List") !== null){
    Website_List = JSON.parse(localStorage.getItem('Website_List'));
    Display()
}
function Create() {
    var dataError = document.getElementById("dataError");

    if(ValidateName() && ValidateURL() === true){
        dataError.classList.add("d-none")
        var website = {
            name: Website_Name.value,
            url: Website_URL.value,
        };
        Website_List.push(website);
    
        localStorage.setItem("Website_List", JSON.stringify(Website_List))
        Display()
        Clear()
    }
    else{
        dataError.classList.remove("d-none")
    }
}

function Display() {
    var mydata = " ";
    for (var i = 0; i < Website_List.length; i++) {
        mydata += ` <tr>
                        <td class="text-center">${i+1}</td>
                        <td class="text-center">${Website_List[i].name}</td>
                        <td class="text-center"><button onclick="Visit()" class="button2"><i class="fa-solid fa-eye"></i> Visit </button>
                        </td>
                        <td class="text-center"><button onclick="Delete(${i})" class="button3"><i class="fa-solid fa-trash-can"></i> Delete
                            </button></td>
                    </tr>`;
    }
    document.getElementById("myData").innerHTML = mydata;
}

function Clear(){
    Website_Name.value = "";
    Website_URL.value = "";
}

function Visit(){
    window.location.href = Website_URL;
}


function Delete(index){
    Website_List.splice(index,1);
    localStorage.setItem("Website_List", JSON.stringify(Website_List));
    Display();
}

function ValidateName(){
    var regexName = /^[A-Z][a-z]{2,20}$/

    var nameError = document.getElementById("nameError")
    if(regexName.test(Website_Name.value)){
        Website_Name.classList.add("is-valid");
        Website_Name.classList.remove("is-invalid");
        nameError.classList.add("d-none");
        return true;
    }
    else{
        Website_Name.classList.remove("is-valid");
        Website_Name.classList.add("is-invalid");
        nameError.classList.remove("d-none");
        return false;
    }
}

function ValidateURL(){
    var regexURL = /^https:\/\/[a-z]{1,20}\.[a-z]{1,6}$/

    var urlError = document.getElementById("urlError")
    if(regexURL.test(Website_URL.value)){
        Website_URL.classList.add("is-valid");
        Website_URL.classList.remove("is-invalid");
        urlError.classList.add("d-none");
        return true;
    }
    else{
        Website_URL.classList.remove("is-valid");
        Website_URL.classList.add("is-invalid");
        urlError.classList.remove("d-none");
        return false;
    }
}