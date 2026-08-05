document.addEventListener("DOMContentLoaded", () => {

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
                <input class="price" type="number" step="0.01">
            </label>

            <label>
                Purchase quantity
                <input class="purchaseQty" type="number" step="0.01">
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
                Amount used
                <input class="usedQty" type="number" step="0.01">
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

            <button type="button" class="removeBtn">Remove</button>
            <hr>
        `;

        ingredientBox.appendChild(div);

        div.querySelector(".removeBtn").addEventListener("click", () => {
            div.remove();
        });
    }

    function convertToBase(amount, unit) {

        switch (unit) {
            case "kg":
            case "litre":
                return amount * 1000;

            case "g":
            case "ml":
            case "each":
                return amount;

            default:
                return amount;
        }
    }

    function getCategory(unit) {

        if (unit === "kg" || unit === "g")
            return "weight";

        if (unit === "litre" || unit === "ml")
            return "volume";

        return "each";
    }

    addBtn?.addEventListener("click", createIngredient);

    calculateBtn?.addEventListener("click", () => {

        let ingredientCost = 0;

        document.querySelectorAll(".ingredient").forEach(item => {

            const price = Number(item.querySelector(".price").value);
            const purchaseQty = Number(item.querySelector(".purchaseQty").value);
            const usedQty = Number(item.querySelector(".usedQty").value);

            const purchaseUnit = item.querySelector(".purchaseUnit").value;
            const usedUnit = item.querySelector(".usedUnit").value;

            if (!price || !purchaseQty || !usedQty)
                return;

            // Prevent mixing units
            if (getCategory(purchaseUnit) !== getCategory(usedUnit)) {
                alert("Purchase unit and used unit must match.");
                return;
            }

            const purchaseAmount = convertToBase(purchaseQty, purchaseUnit);
            const usedAmount = convertToBase(usedQty, usedUnit);

            const costPerUnit = price / purchaseAmount;

            ingredientCost += usedAmount * costPerUnit;

        });

        const packaging = Number(document.getElementById("packaging").value) || 0;
        const labour = Number(document.getElementById("labour").value) || 0;
        const transport = Number(document.getElementById("transport").value) || 0;
        const profit = Number(document.getElementById("profit").value) || 0;

        const totalCost = ingredientCost + packaging + labour + transport;
        const sellingPrice = totalCost * (1 + profit / 100);

        document.getElementById("ingredientCost").textContent = ingredientCost.toFixed(2);
        document.getElementById("totalCost").textContent = totalCost.toFixed(2);
        document.getElementById("sellingPrice").textContent = sellingPrice.toFixed(2);

    });

    createIngredient();

});
