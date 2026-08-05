document.addEventListener("DOMContentLoaded", function () {

  const ingredientBox = document.getElementById("ingredients");


  function createIngredient() {

    const div = document.createElement("div");

    div.className = "ingredient";

    div.innerHTML = `

      <input class="name" placeholder="Ingredient name">


      <label>
      Purchase price (GH₵)
      <input class="price" type="number">
      </label>


      <label>
      Purchase quantity
      <input class="purchaseQty" type="number">
      </label>


      <label>
      Purchase unit
      <select class="purchaseUnit">
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="litre">litre</option>
        <option value="ml">ml</option>
        <option value="each">each</option>
      </select>
      </label>


      <label>
      Recipe quantity used
      <input class="usedQty" type="number">
      </label>


      <label>
      Recipe unit used
      <select class="usedUnit">
        <option value="kg">kg</option>
        <option value="g">g</option>
        <option value="litre">litre</option>
        <option value="ml">ml</option>
        <option value="each">each</option>
      </select>
      </label>

      <hr>

    `;


    ingredientBox.appendChild(div);

  }



  document.getElementById("addBtn").onclick = createIngredient;



  function convertToBase(amount, unit) {

    if (unit === "kg") {
      return amount * 1000;
    }

    if (unit === "litre") {
      return amount * 1000;
    }

    return amount;

  }



  const saveButton = document.getElementById("saveIngredient");

if (saveButton) {

saveButton.onclick=function(){


    let ingredientCost = 0;


    document.querySelectorAll(".ingredient")
    .forEach(function(item){


      let price =
      Number(item.querySelector(".price").value) || 0;


      let purchaseQty =
      Number(item.querySelector(".purchaseQty").value) || 0;


      let purchaseUnit =
      item.querySelector(".purchaseUnit").value;


      let usedQty =
      Number(item.querySelector(".usedQty").value) || 0;


      let usedUnit =
      item.querySelector(".usedUnit").value;



      let purchaseBase =
      convertToBase(purchaseQty, purchaseUnit);


      let usedBase =
      convertToBase(usedQty, usedUnit);



      if (purchaseBase > 0) {


        let costPerBaseUnit =
        price / purchaseBase;


        ingredientCost +=
        usedBase * costPerBaseUnit;


      }


    });



    let packaging =
    Number(document.getElementById("packaging").value) || 0;


    let labour =
    Number(document.getElementById("labour").value) || 0;


    let transport =
    Number(document.getElementById("transport").value) || 0;


    let profit =
    Number(document.getElementById("profit").value) || 0;



    let total =
    ingredientCost +
    packaging +
    labour +
    transport;



    let selling =
    total + (total * profit / 100);



    document.getElementById("ingredientCost").innerText =
    ingredientCost.toFixed(2);


    document.getElementById("totalCost").innerText =
    total.toFixed(2);


    document.getElementById("sellingPrice").innerText =
    selling.toFixed(2);



  };



  createIngredient();


});

let ingredientDatabase =
JSON.parse(localStorage.getItem("cakeIngredients")) || [];



function displayDatabase(){


const list =
document.getElementById("databaseList");


list.innerHTML="";



ingredientDatabase.forEach(function(item,index){


list.innerHTML += `

<div class="ingredient">

<strong>${item.name}</strong><br>

Category:
${item.category}<br>

Price:
GH₵${item.price}

per ${item.quantity}${item.unit}


<button onclick="editIngredient(${index})">
Edit
</button>


<button onclick="deleteIngredient(${index})">
Delete
</button>


</div>

`;

});


}



document.getElementById("saveIngredient")
.onclick=function(){


let ingredient={

name:
document.getElementById("dbName").value,


category:
document.getElementById("dbCategory").value,


price:
Number(document.getElementById("dbPrice").value),


quantity:
Number(document.getElementById("dbQuantity").value),


unit:
document.getElementById("dbUnit").value

};



ingredientDatabase.push(ingredient);



localStorage.setItem(
"cakeIngredients",
JSON.stringify(ingredientDatabase)
);



displayDatabase();



};



window.deleteIngredient=function(index){


ingredientDatabase.splice(index,1);


localStorage.setItem(
"cakeIngredients",
JSON.stringify(ingredientDatabase)
);


displayDatabase();


};



window.editIngredient=function(index){


let item =
ingredientDatabase[index];


document.getElementById("dbName").value =
item.name;


document.getElementById("dbPrice").value =
item.price;


document.getElementById("dbQuantity").value =
item.quantity;


document.getElementById("dbUnit").value =
item.unit;


ingredientDatabase.splice(index,1);



localStorage.setItem(
"cakeIngredients",
JSON.stringify(ingredientDatabase)
);


displayDatabase();

};

}



if (document.getElementById("databaseList")) {
  displayDatabase();
}
