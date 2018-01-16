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
    var Expense = function (id, description, value) {
        this.id =id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;

        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: { 
            exp:[],
            inc:[]
        },
        totals: {
            exp:0,
            inc:0
        },
        budget:0,
        percentage:0
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            // Create new ID 
            if(data.allItems[type].length > 0) {
             ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else { 
                ID = 0;
            }
            // Create new item based inc/exp
            if (type === "exp"){ newItem = new Expense(ID, des, val);}
            else if (type === "inc") { newItem = new Income(ID, des, val); }

            data.allItems[type].push(newItem);

            //Return
            return newItem;
            console.log(newItem);
        },

        calculateBudget : function() {
            // Calc total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            // calc buget inc- exp
            data.percentage
            // calcv
        },
        testing: function() {
            console.log(data);
        }
    };
})();

// UI Controller
var UIController = (function() {
//    Private strings
var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn:  ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
};
//    Public function 
return {
    getinput: function() {
        return {
            type : document.querySelector(DOMstrings.inputType).value, // inc or exp
            description : document.querySelector(DOMstrings.inputDesc).value,
            value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
        }
    },
    addListItem: function(obj, type) {
        var html, newHtml, element;
        //Create html string with place holder text
        if (type === "inc") {
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        // Replace place holder
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        // Insert html in DOM
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function() {
        var fields, fieldsArr;

       fields = document.querySelectorAll(DOMstrings.inputDesc + ", " + DOMstrings.inputValue);
       fieldsArr =Array.prototype.slice.call(fields);
       fieldsArr.forEach(function(current, index, array) {
           current.value = "";

       });
       // Focus on description
       fieldsArr[0].focus();
    },
    getDOMstrings: function() {
        return DOMstrings;
    }    

};

})();

// Add event Handler


// App controller
var controller = ( function(budgetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings(); 
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAdditem);
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });
    };
   var updateBudget = function () {
       // Calculate 
   }
   var ctrlAdditem = function () {
       var input, newItem;
       
       input = UICtrl.getinput();

       if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
    //  Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
    // Add item to UI
     UICtrl.addListItem(newItem, input.type);
    //  Clear field
    UICtrl.clearFields();
    // Calculate budget
    updateBudget();
       }
    // Display In UI
   };

   return {
       init: function() {
           setupEventListeners();
       }
   };
})(budgetController, UIController);

controller.init();
// Add event Handler


// Get input values
// Add item to our data structure
// Add new item to the ui
// Calculate budget
// update the UI