document.addEventListener("DOMContentLoaded", function () {

  const ingredientBox = document.getElementById("ingredients");
  const addBtn = document.getElementById("addBtn");
  const calculateBtn = document.getElementById("calculateBtn");


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
      Amount used in recipe
      <input class="usedQty" type="number">
      </label>


      <label>
      Unit used
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



  if(addBtn){
    addBtn.onclick = createIngredient;
  }



  function convertToBase(amount, unit){

    if(unit === "kg" || unit === "litre"){
      return amount * 1000;
    }

    return amount;

  }



  if(calculateBtn){

    calculateBtn.onclick = function(){

      let ingredientCost = 0;


      document.querySelectorAll(".ingredient")
      .forEach(function(item){


        let price = Number(
          item.querySelector(".price").value
        ) || 0;


        let purchaseQty = Number(
          item.querySelector(".purchaseQty").value
        ) || 0;


        let purchaseUnit =
        item.querySelector(".purchaseUnit").value;


        let usedQty = Number(
          item.querySelector(".usedQty").value
        ) || 0;


        let usedUnit =
        item.querySelector(".usedUnit").value;



        let purchaseAmount =
        convertToBase(purchaseQty,purchaseUnit);


        let usedAmount =
        convertToBase(usedQty,usedUnit);



        if(purchaseAmount > 0){

          let costPerUnit =
          price / purchaseAmount;


          ingredientCost +=
          usedAmount * costPerUnit;

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

  }



  createIngredient();


});
