
let leftButton = document.createElement("button")
leftButton.classList.add("btn","btn-outline-success")
leftButton.setAttribute("id","addButton")
leftButton.setAttribute("type","Button")
leftButton.style = "width: 100%;margin-bottom: 30px; "
leftButton.innerText = "Not Ekle";

let noteSubmit = document.createElement("button")
noteSubmit.classList.add("btn","btn-primary","mb-3")
noteSubmit.setAttribute("type","submit")
noteSubmit.setAttribute("id","send")
noteSubmit.innerHTML = "Ekle"



let addNoteDom = document.querySelector("#addButton");






let rightDom = document.querySelector(".col-8")
rightDom.style = `position: fixed;
margin-top: 250px;
width: 50%;
margin-left: 500px;`;

function seeForm(){
    rightDom.innerHTML = ""
    rightDom.innerHTML = `<form class="row g-3" id="form"><h3 class="text-center">Not Ekleme</h3><div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Başlık</label>
    <input type="text" class="form-control" name="baslik" id="exampleFormControlInput1" placeholder="">
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Not</label>
    <textarea class="form-control" name="not" id="exampleFormControlTextarea1" rows="8"></textarea>
  </div><form/>`
  rightDom.childNodes[0].appendChild(noteSubmit)

}

function addForms() {
    let forms = document.querySelector("#form");
    
    let baslık = forms.baslik.value;
    let not = forms.not.value; 
    let date = new Date();
    const [month,day,year] = [date.getDate(),date.getMonth() + 1,date.getFullYear()]
    let result = {
        baslık : baslık,
        not : not,
        date:{
            month : month,
            day : day,
            year : year
        }
    } 
    localStorage.setItem(baslık,JSON.stringify(result))

    window.event.preventDefault();
    seeNots();
    spanLenght();
    forms.reset();
}

function deleteNot() {
    let isTrue = confirm("Silmek İstediğinize Eminmisiniz ?")
    if(isTrue){
        localStorage.removeItem(this.id);
        seeNots();
        spanLenght();
    }
}

function descriptionNot(){
    console.log(this)
    let baslık = this.id
    let not = JSON.parse(localStorage.getItem(this.id)).not
    let footer = this.querySelector(".footer").innerHTML
    
    let rightDom2 = document.querySelector(".col-8")
    rightDom2.style = `position: fixed;
    margin-top: 250px;
    width: 50%;
    margin-left: 500px;`
    
    let DOM = `<h1>${baslık} ${footer}</h1>
    <br><br>
    <h5>${not}</h5>`
    
    rightDom2.innerHTML = DOM;
    
}

function seeNots(){
    
    let notlar = Object.keys(localStorage)
    let leftDom = document.querySelector(".col-3")
    leftDom.innerHTML = "";
    if(!notlar){
        let DOM = ` <br/> <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Not Bulunmamakta</h4>
        <p>Şuanda Hiç Not Bulunmamaktadır Lütfen Not Ekle'ye Tıklayarak Not Ekleyiniz </p>
        <hr>
        <p class="mb-0">Kod Yazmak Sanattır..</p>
      </div>`
        leftDom.append(leftButton);
        leftDom.insertAdjacentHTML("beforeend",DOM)
    }
    else{
        
        leftDom.append(leftButton)
        

        notlar.forEach(item => {         
            let data = JSON.parse(localStorage.getItem(item))
            
            let topDiv = document.createElement("div")
            topDiv.classList.add("card","bg-light" ,"mb-3")
            topDiv.style = "width:100%;cursor:pointer;";
            topDiv.id = item;

            let header = document.createElement("div")
            header.classList.add("card-header");
            header.innerText = "Not"

            let headerSpan = document.createElement("span")
            headerSpan.style="float:right;cursor:pointer;color:red;font-weight:700";
            headerSpan.innerText = "X";
            headerSpan.id=item;
            
            header.appendChild(headerSpan);
            
            let body = document.createElement("div")
            body.classList.add("card-body")
            
            let bodyH5 = document.createElement("h5")
            bodyH5.classList.add("card-title")
            bodyH5.innerText = data.baslık.toUpperCase()

            let bodyP = document.createElement("p")
            bodyP.classList.add("card-text");
            data.not.length < 125 ? bodyP.innerHTML = data.not : bodyP.innerHTML = data.not.slice(0,125) + " ...."

            
            let footer = document.createElement("footer");
            footer.classList.add("footer","text-end")
            footer.innerText = data.date.day+ "/ " + data.date.day +  "/ " +data.date.year;

            body.appendChild(bodyH5);
            body.appendChild(bodyP);
            body.appendChild(footer)

            topDiv.appendChild(header)
            topDiv.appendChild(body)
            leftDom.append(topDiv)
            
        });
    }
    
}




addNoteDom.addEventListener("click",seeForm)
leftButton.addEventListener("click",seeForm)
noteSubmit.addEventListener("click",addForms)

seeNots();
spanLenght();

function spanLenght() { //span ve acıkalam
    let spans = document.querySelectorAll("span");

    let desc = document.querySelectorAll(".card")

    for(let item of spans){
        item.addEventListener("click",deleteNot)
        }
    for(let item of desc){
        item.addEventListener("click",descriptionNot)
    }

}













