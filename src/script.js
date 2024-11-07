const recordKeeper=[]

// sell button
let sellBtn=document.getElementById("sellDoughnutBtn")

// and doughnut and change price btn
let editBtns=document.querySelectorAll(".editBtn")
let totalDoughts=document.querySelector("#changeQuantity").value;
let isReadOnly=false


// function for selling doughnuts
function makeSells(){
    let buyersName=document.getElementById("buyersName");
    let quantityOfDoughnut=document.getElementById("doughNutQuantity");

    let buyersInfo={
        buyersName:buyersName.value,
        quantityOfDoughnut:quantityOfDoughnut.value
    }
    recordKeeper.push(buyersInfo)
    // clear the input field
     buyersName.value="";
     quantityOfDoughnut.value=""

    
    TotalValue(recordKeeper) 
};

// function for summing up total number of doughnuts sold
function TotalValue(array){
    let availableQuantity=document.querySelector("#availableQuantity")
    let totalDoughtnutSold=array.reduce((acc,cur)=>{
        return acc + Number(cur.quantityOfDoughnut)
    },0)
     let avl=totalDoughts                                                                                                                                                             - totalDoughtnutSold
     if(avl == 0) return alert("you self don try, go look for better thing chop")

    availableQuantity.innerHTML =avl
}

// function to updatePrice and quantity
function updatePriceQuantity(btn){
    let classF=btn.name
   let inputPrice=document.getElementById(classF);
   isReadOnly=!isReadOnly

   inputPrice.readOnly=isReadOnly

   btn.innerText= isReadOnly ? "Edit": "Edited" ;
}

editBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>updatePriceQuantity(btn))
})


sellBtn.addEventListener("click",makeSells)


// function for calculating sales.