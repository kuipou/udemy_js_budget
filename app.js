/*
TO-DO
CONTROL -- Add event Handler
UI      -- Get input values
DATA --    Add item to our data structure
UI   -- Add new item to the ui
Calculate budget
UI -- update the UI */


//Controllers
// Budget Controler
var budgetController = (function() {
    
})();

// UI Controller
var UIController = (function() {
//    Private strings
var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn:  ".add__btn"
};
//    Public function 
return {
    getinput: function() {
        return {
            type : document.querySelector(DOMstrings.inputType).value, // inc or exp
            description : document.querySelector(DOMstrings.inputDesc).value,
            value : document.querySelector(DOMstrings.inputValue).value,
        }
    },
    getDOMstrings: function() {
        return DOMstrings;
    }    

};

})();

// Add event Handler


// App controller
var controller = ( function(budgetCtrl, UICtrl) {
   var DOM = UICtrl.getDOMstrings(); 
   var ctrlAdditem = function () {
       var input = UICtrl.getinput();
       console.log(input);
   }
document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAdditem);
document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAdditem();
    }
});
})(budgetController, UIController);

// Add event Handler


// Get input values
// Add item to our data structure
// Add new item to the ui
// Calculate budget
// update the UI