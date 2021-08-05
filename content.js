// content.js
    document.querySelector("#sel_course").innerHTML = "Hello World";

// let select = 1;
const nameList = ["數位系-俞齊山", ""];

function autoAdmit() {

    for (let element of document.getElementsByTagName("div")) {
        if (
            element.getAttribute("aria-label") === "一或多位使用者想加入這場通話"
        ) {

            const loginImage = element.querySelector("img");
            const loginName = loginImage.getAttribute("title");            

            let find = false;
            nameList.forEach(name => {
                if (loginName === name) {
                    for (let element of document.getElementsByTagName("span")) {
                      if (element.innerHTML === "接受") {
                          element.click();
                      } 
                    }
                    find = true;
                }              
            })
            if(!find) {
                for (let element of document.getElementsByTagName("span")) {
                    if (element.innerHTML === "拒絕加入") {
                        //   element.click();
                    }
                }            
            }   

        }
    }
}

function selectCourse(e) {
  const course = e.target.value;
  chrome.storage.sync.set({ course }, () => {
    console.log("set");
    //string or array of string or object keys
    chrome.storage.sync.get("course", obj => {
      document.querySelector('#sel_course').innerHTML = obj["course"];
    });
  });
}

document.querySelector("#course").addEventListener("change", selectCourse);

window.onload = function() {
	chrome.storage.sync.get("active", (obj) => {
    const active_course = obj.hasOwnProperty("course") ? obj["course"] : 'guo8yi';
    const courses = document.querySelector("#course");
    courses.value = active_course;
    setInterval(autoAdmit, 1000);
  });
};
