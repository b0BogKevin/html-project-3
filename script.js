function Update() {   
fetch("https://vvri.pythonanywhere.com/api/courses",{
    method:"GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
    })
   
        .then(response => response.json())
        .then(data => {
            let ki = ""
            if (data)
            {
                data.forEach(element => {
                    ki+=`<div class="course">
                    <div class="course-id">${element.id}</div>
                             <h2>${element.name}</h2>
                             `
                            for (let i = 0; i < element.students.length; i++) {
                                ki+=`<div class="student" onclick="DeleteStudent(${element.id},${element.students[i].id})">${element.students[i].name}</div>`
                            }
                            ki+= `<button class="del-button" onclick="DeleteCourse(${element.id})"><img src="images/bin.webp" alt="" srcset=""></button>
                            <input type="text" id="new-student-input" class="new-student-input">
                            <button class="new-student-button"  onclick=(NewStudent(${element.id}))>+</button>
                             </div>`
            })
        }
        ki+=`<div class="course">
                    <input type="text" id="new-course-input">  `

                            ki+= `<button class="new-course-button" onclick="NewCourse()">+</button>
                             </div>`
        document.getElementById("courses").innerHTML = ki
        })
        .catch(error => console.log("Hiba történt: " + error))
}
Update()

function DeleteStudent(courseId, studentId) {
    var originalStudents = []
    fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
        })
       
            .then(response => response.json())
            .then(data => {
                originalStudents = data.students
            })
            .catch(error => console.log("Hiba történt: " + error))

    fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
     
    method: "PATCH",

    body: JSON.stringify({
        students:originalStudents.splice(studentId,1)
        
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
Update()
}

function DeleteCourse(id) {
fetch(`https://vvri.pythonanywhere.com/api/courses/${id}`, {
     
method: "DELETE",
headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
console.log("deleted")
Update()
}

function NewCourse() {
    coursename = document.getElementById("new-course-input").value
    fetch("https://vvri.pythonanywhere.com/api/courses", {
   method: "POST",
     
   body: JSON.stringify({
       name:coursename
   }),
   headers: {
       "Content-type": "application/json; charset=UTF-8"
   }
})
Update()
}

function NewStudent(course) {
    let studentNameinputs = document.getElementsByClassName("new-student-input")
    let newStudent = studentNameinputs[course-1].value

let originalStudents = getOriginalStudentList(course)
console.log(originalStudents)
}

function getOriginalStudentList(course) {
    
    var originalStudents = []
    fetch(`https://vvri.pythonanywhere.com/api/courses/${course}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        }
        })
            .then(response => response.json())
            .then(data => {
                originalStudents = data.students

                return originalStudents
                
            })
            .catch(error => console.log("Hiba történt: " + error))
         return originalStudents
}