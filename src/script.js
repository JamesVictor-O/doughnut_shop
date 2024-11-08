const recordKeeper=[]

// sell button
let sellBtn=document.getElementById("sellDoughnutBtn")

// and doughnut and change price btn
let editBtns=document.querySelectorAll(".editBtn")
let totalDoughts=document.querySelector("#changeQuantity").value;
let isReadOnly=false;


// function for selling doughnuts
function makeSells(){
    let pricePerdoughnut=document.getElementById("changePrice").value
    let buyersName=document.getElementById("buyersName");
    let quantityOfDoughnut=document.getElementById("doughNutQuantity");
    
    // validating sells details before selling
    if(pricePerdoughnut.trim()=="") return alert("please set a price")
    if(buyersName.value.trim()==""|| quantityOfDoughnut.value.trim()=="") return alert("please fill the required sells details")    
    
    // checking for already existing buyers
    let buyers_Index=recordKeeper.findIndex(buyer => buyer.buyersName === buyersName.value)   
    if(buyers_Index < 0){
        let buyersInfo={
            buyersName:buyersName.value,
            quantityOfDoughnut:Number(quantityOfDoughnut.value),
            amount:Number(quantityOfDoughnut.value) * Number(pricePerdoughnut),
            pricePerdoughnut:Number(pricePerdoughnut)
        }
        recordKeeper.push(buyersInfo)
    }else{
        for(i=0;i< recordKeeper.length; i++){
            if(recordKeeper[i].buyersName.trim() === buyersName.value.trim()){
                recordKeeper[i].quantityOfDoughnut = recordKeeper[i].quantityOfDoughnut + Number(quantityOfDoughnut.value);
                recordKeeper[i].amount=recordKeeper[i].quantityOfDoughnut * pricePerdoughnut
            }
        }
    }
   
    // clear the input field
     buyersName.value="";
     quantityOfDoughnut.value=""


    TotalValue(recordKeeper) 
};

// function for summing up total number of doughnuts sold
function TotalValue(array){
    let availableQuantity=document.querySelector("#availableQuantity");
    let inputedQuantity=document.querySelector("#changeQuantity").value

    let totalDoughtnutSold=array.reduce((acc,cur)=>{
        return acc + cur.quantityOfDoughnut
    },0)

    let cumulativeAmount=array.reduce((acc,cur)=>{
        return acc + cur.amount
    },0)
     
     let avl=inputedQuantity-totalDoughtnutSold;

     if(avl == 0) return alert("you self don try, go look for better thing chop")
    availableQuantity.innerHTML =avl;

   displayHistory(array,cumulativeAmount)
}

// display record in the history section
function displayHistory(transactions,cumulativeAmount){
    let historyContainer=document.getElementById("history")
    let totalCumulativeAmount=document.getElementById("cumulativeAmount")
    historyContainer.innerHTML="";



    for(i=0; i < transactions.length; i++){
        historyContainer.innerHTML += ` <div class="w-[95%] mx-2 flex flex-row justify-between border-b-2 border-gray-400 p-4">
                            <h2>${transactions[i].buyersName}</h2>
                            <div class="flex flex-row justify-between items-center w-48">
                                <p class="mr-2">Quantity : <span class="ml-2">${transactions[i].quantityOfDoughnut}</span></p>
                                <span class="border-2 border-gray-300 rounded-md w-20 h-6 text-center">${transactions[i].amount}</span>
                            </div>
                        </div>`
    }

totalCumulativeAmount.innerHTML="$" + cumulativeAmount
}
// function to updatePrice and quantity
function updatePriceQuantity(btn){
    // updating the number of available doughnuts
   
    // --------------------------------------------------//
   

    let classF=btn.name

    if(classF == 'changeQuantity'){
        let availableQuantity=document.querySelector("#availableQuantity");
        let inputedQuantity=document.querySelector("#changeQuantity").value;
        availableQuantity.innerHTML=inputedQuantity;
    }
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