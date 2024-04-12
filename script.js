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
                             <h2>${element.name}</h2>
                             <div>${element.id}</div>
                        </div>`
            })
        }
        document.getElementsByClassName("courses").innerHTML = ki
        })
        .catch(error => console.log("Hiba történt: " + error))