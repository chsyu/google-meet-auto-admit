// content.js
    if(!!document.querySelector("#sel_course")) 
        document.querySelector("#sel_course").innerHTML = "Hello World";

const nameList1 = ["數位系-俞齊山", "1"];
const nameList2 = ["數位系-俞齊山", "2"];
const nameList3 = ["數位系-俞齊山", "3"];
let nameList = nameList1;

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

function setNameList(course) {
    if(course === 'guo8yi')
        nameList = nameList1;
    else if(course === 'guo8mei')
        nameList = nameList2;
    else if(course === 'guo8zhen')
        nameList = nameList3;
    console.log(nameList)
}

function selectCourse(e) {
  const course = e.target.value;
  setNameList(course);
  chrome.storage.sync.set({ course: course });
}

if (!!document.querySelector("#course"))
    document
    .querySelector("#course")
    .addEventListener("change", selectCourse);

chrome.storage.sync.get("course", (obj) => {
    const active_course = obj["course"];
    if(!active_course)
        active_course = "guo8mei";
    setNameList(active_course);
    const courses = document.querySelector("#course");
    if(!!courses)
        courses.value = active_course;
});

setInterval(autoAdmit, 1000);
