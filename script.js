const url = "https://vvri.pythonanywhere.com/api/courses";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function updateHTML(data) {
    let ki = ""
            if (data) {
                data.forEach(element => {
                    ki += ` <div class="course">
                            <div class="course-id">${element.id}</div>
                            <h2>${element.name}</h2>`
                    for (let i = 0; i < element.students.length; i++) {
                        ki += ` <div class="edit-student-button" onclick="EditStudent(${element.id},${element.students[i].id})"><img src="images/pen.png" alt="" srcset=""></div>
                                <div class="student" data-diakid="${element.students[i].id}" onclick="DeleteStudent(${element.students[i].id})">${element.students[i].name}</div>`
                    }
                    ki += ` <button class="del-button" onclick="DeleteCourse(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                            <input type="text" class="new-student-input">
                            <button class="new-student-button"  onclick=(AssignStudent(${element.id}))>+</button>
                            </div>`
                })
            }
            ki += ` <div class="course">
                        <input type="text" id="new-course-input">
                        <button class="new-course-button" onclick="NewCourse()">+</button>
                    </div>`
            document.getElementById("courses").innerHTML = ki    
}
async function Update() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            }
          })
            const data = await response.json()
            updateHTML(data)
        }
    catch (error) {
        console.log("Hiba történt: " + error)
    }
}
Update()

async function DeleteCourse(id) {
    try{
    const response = await(fetch(`https://vvri.pythonanywhere.com/api/courses/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }))
    const data = await response.json();
    console.log(data);

    sleep(500).then(() => { Update(); });
    }
    catch(error)
    {
        console.log("Hiba történt: " + error)
    }
}

async function NewCourse() {
    try {
       coursename = document.getElementById("new-course-input").value
    if (coursename.trim()=="") {
        return
    }
    const response = await(fetch("https://vvri.pythonanywhere.com/api/courses", {
        method: "POST",

        body: JSON.stringify({
            name: coursename
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }))
    const data = await response.json();
    updateHTML(data);

    sleep(500).then(() => { Update(); }); 
    } catch (error) {
        console.log("Hiba történt: " + error)
    }
    
}

async function DeleteStudent(id) {
    try {
        const response = await(fetch(`https://vvri.pythonanywhere.com/api/students/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }))
    const data = await response.json();
    updateHTML(data);

    sleep(500).then(() => { Update(); });
    } catch (error) {
        console.log("Hiba történt: " + error)
    }
    
}

async function AssignStudent(id) {
    try {
        let studentNameinputs = document.getElementsByClassName("new-student-input")
    let newStudent =""
    if (studentNameinputs.length ==1) {
        newStudent = studentNameinputs[0].value
    }
    else{
         newStudent = studentNameinputs[id - 1].value
    }
    if (newStudent.trim()=="") {
        Update()
        return
    }
    const response = await(fetch(`https://vvri.pythonanywhere.com/api/students`, {
        method: "POST",

        body: JSON.stringify({
            name: newStudent,
            course_id: id,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }))
    const data = await response.json();
    updateHTML(data);
    sleep(500).then(() => { Update(); });
    } catch (error) {
        console.log("Hiba történt: " + error)
    }
    
}

function EditStudent(id, studentId) {
    let students = document.getElementsByClassName("student")
    let currentcourse = ""
    for (const s of students) {
        currentcourse = s
        if (s.dataset.diakid == studentId) {
            break;
        }
    }
    currentcourse.innerHTML = `<input type="text" id="update-student-input" class="new-student-input"> <button class="update-student-button" onclick="UpdateStudent(${studentId},${id})"><img src="images/check.png" alt="" srcset=""></button>`
    currentcourse.removeAttribute("onclick");
}

async function UpdateStudent(id, courseId) {
    let studentNameinputs = document.getElementById("update-student-input")
    let newStudent = studentNameinputs.value
    if (newStudent.trim()=="") {
        Update()
        return
    }
    try {
        const response = await(fetch(`https://vvri.pythonanywhere.com/api/students/${id}`, {
        method: "PUT",

        body: JSON.stringify({
            name: newStudent,
            course_id: courseId
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }))
    const data = await response.json();
    updateHTML(data);
    sleep(500).then(() => { Update(); });
    } catch (error) {
        console.log("Hiba történt: " + error)
    }
    
}

async function OneCourse() {
    id = document.getElementById("number-input").value
    if (id == "") {
        Update()
        return
    }
try {
    if (id>0) {
       const response = await fetch(`https://vvri.pythonanywhere.com/api/courses/${id}`, {
       method: "GET",
       headers: {
           "Content-type": "application/json; charset=UTF-8",
           "Access-Control-Allow-Origin": "*"
       }
   })
       const element = await response.json()
           let ki = ""
           if (element) {
               ki += ` <div class="course">
                       <div class="course-id">${element.id}</div>
                       <h2>${element.name}</h2>`
               for (let i = 0; i < element.students.length; i++) {
                   ki += ` <div class="edit-student-button" onclick="EditStudent(${element.id},${element.students[i].id})"><img src="images/pen.png" alt="" srcset=""></div>
                           <div class="student" data-diakid="${element.students[i].id}" onclick="DeleteStudent(${element.students[i].id})">${element.students[i].name}</div>`
               }
               ki += ` <button class="del-button" onclick="DeleteCourse(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                       <input type="text" class="new-student-input">
                       <button class="new-student-button"  onclick=(AssignStudent(${element.id}))>+</button>
                       </div>`
           }
           document.getElementById("courses").innerHTML = ki
   }
   else{
        const response = await fetch("https://vvri.pythonanywhere.com/api/courses", {
        method: "GET",
        headers: {
           "Content-type": "application/json; charset=UTF-8",
           "Access-Control-Allow-Origin": "*"
        }
   })
            const data = await response.json()
            let ki = ""
            if (data) {
               data.forEach(element => {
                   if (element.name == null || element.name.toLowerCase().includes(id.toLowerCase()) || !element.name=="null") {
                       ki += ` <div class="course">
                           <div class="course-id">${element.id}</div>
                           <h2>${element.name}</h2>`
                   for (let i = 0; i < element.students.length; i++) {
                       ki += ` <div class="edit-student-button" onclick="EditStudent(${element.id},${element.students[i].id})"><img src="images/pen.png" alt="" srcset=""></div>
                               <div class="student" data-diakid="${element.students[i].id}" onclick="DeleteStudent(${element.students[i].id})">${element.students[i].name}</div>`
                   }
                   ki += ` <button class="del-button" onclick="DeleteCourse(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                           <input type="text" class="new-student-input">
                           <button class="new-student-button"  onclick=(AssignStudent(${element.id}))>+</button>
                           </div>`
                   }
               })
           }
           ki += ` <div class="course">
                   <input type="text" id="new-course-input">
                   <button class="new-course-button" onclick="NewCourse()">+</button>
           </div>`
           document.getElementById("courses").innerHTML = ki
   } 
} catch (error) {
    console.log("Hiba történt: " + error)
}
}

async function OneStudent() {
    try {
        id = document.getElementById("number-input").value
    if (id == "") {
        ShowAllStudnts()
        return
    }
    if (id>0) {
        const response = await fetch(`https://vvri.pythonanywhere.com/api/students/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    })
        const element = await response.json()
            let ki = ""
            if (element) {
                ki += `<div class="course">
                        <div class="course-id">${element.id}</div>
                                 <h2>${element.name}</h2>
                                 <button class="del-button" onclick="DeleteStudent(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                                 </div>`
            }
            document.getElementById("courses").innerHTML = ki
    }
    else{
        const response = await fetch(`https://vvri.pythonanywhere.com/api/students`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    })
        const data = await response.json()
            let ki = ""
            if (data) {
                data.forEach(element => {
                    if (element.name == null || element.name.toLowerCase().includes(id.toLowerCase()) || element.name=="null") {
                         ki += `<div class="course">
                        <div class="course-id">${element.id}</div>
                                 <h2>${element.name}</h2>
                                 <button class="del-button" onclick="DeleteStudent(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                                 </div>`
                    }
                })
            }
            document.getElementById("courses").innerHTML = ki
    }  
    } catch (error) {
    console.log("Hiba történt: " + error)
    }
}
async function ShowAllStudnts() {
    try {
        const response = await fetch(`https://vvri.pythonanywhere.com/api/students`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
    })
        const data = await response.json()
            let ki = ""
            if (data) {
                data.forEach(element => {
                ki += `<div class="course">
                        <div class="course-id">${element.id}</div>
                                 <h2>${element.name}</h2>
                                 <button class="del-button" onclick="DeleteStudent(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                                 </div>`
                })
            }
            document.getElementById("courses").innerHTML = ki
    } catch (error) {
    console.log("Hiba történt: " + error) 
    } 
}