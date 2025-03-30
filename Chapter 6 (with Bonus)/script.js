// Waits for the DOM content to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements we'll be working with
    // These variables store references to the input fields, button, and display element
    const costPerLiterInput = document.getElementById('cost-per-liter');
    const litersPurchasedInput = document.getElementById('liters-purchased');
    const calculateButton = document.getElementById('calculate-btn');
    const totalCostDisplay = document.getElementById('total-cost');
    
    // Add click event listener to the calculate button
    // This will call the calculateTotalCost function when the button is clicked
    calculateButton.addEventListener('click', calculateTotalCost);
    
// Calculates the total cost of petrol based on user input and updates the display with the result
    function calculateTotalCost() {
        // Get values from input fields and convert them to floating-point numbers
        const costPerLiter = parseFloat(costPerLiterInput.value);
        const litersPurchased = parseFloat(litersPurchasedInput.value);
        
        // Input validation: Check if inputs are valid numbers
        // isNaN function returns true if the value is Not a Number
        if (isNaN(costPerLiter) || isNaN(litersPurchased)) {
            alert("Please enter valid numbers for both fields");
            return; // Exit the function early if validation fails
        }
        
        // Input validation: Check if inputs are positive numbers
        if (costPerLiter < 0 || litersPurchased < 0) {
            alert("Please enter positive values");
            return; // Exit the function early if validation fails
        }
        
        // Calculate the total cost by multiplying cost per liter by liters purchased
        const totalCost = costPerLiter * litersPurchased;
        
        // Format the result to 2 decimal places and update the display
        // toFixed(2) ensures we show exactly 2 decimal places
        totalCostDisplay.textContent = `£${totalCost.toFixed(2)}`;
    }
});