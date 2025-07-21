alert("js is attached");

function calculateOrder(){
    //adding another line of code
      //checking the terms and conditions box has been checked
    alert("Calculate order function");
    if(termsAndConditions.checked){
        alert("t c checked");
        document.getElementById("t&cError").innerHTML=" ";
    }else{
        alert("t c must be checked");
        document.getElementById("t&cError").innerHTML="Please tick the terms and conditions box";
        return; //whole program stops running
    }
    const addItems = document.getElementsByClassName('radioOption');
	const sandwhichOrder = [];
    let totalCost=0;
	//this for loop goes through all items with the class name radioOption
	for (let i = 0; i < addItems.length; i++) {
		if (addItems[i].checked) { //if an item has been checked do the following:
			sandwhichOrder.push(' ' + addItems[i].value);
			alert(sandwhichOrder); 
            totalCost += Number(addItems[i].dataset.price);
            alert(totalCost);
		}
	} //checking that the sandwhich order has been selected
    if(sandwhichOrder.length>=4){
        alert("they have selected more than 3 items");
        document.getElementById("h2").scrollIntoView(); //scrolls to top of the page
        //clear the error message here
    }else{
        alert("You need to select some items")
        //output an error message using .innerHTML
        return; // whole program will stop running
    }
    document.getElementById("outputDIV").innerHTML="Your order:"+ sandwhichOrder;
    customerDetails(sandwhichOrder);
}



function customerDetails(sandwhichOrder){
    alert("customer details function"+sandwhichOrder);
    const firstName = firstNameInput.value;
    const lastName= LastNameInput.value;
    const cellphone= cellphoneInput.value;
    const pickupTime=checkRange(timeInput,errorTime,"Error, please select between 10am - 11pm");
    if(pickupTime==false){
        alert("there are errors in your inputs");
        return; //whole program will stop running
    }
    alert(firstName,lastName,cellphone,pickupTime);
    //calling up the next function - push data
    pushData(sandwhichOrder,firstName,lastName,cellphone,pickupTime);
}

function checkRange(input,output,errorMessage) {
    alert("in function to check for the range");
    if (input.validity.rangeOverflow || input.validity.rangeUnderflow || input.validity.valueMissing) {
        alert("wrong number"); // sets the variable that called the function to false
        output.innerHTML = errorMessage; // outputs the error message
        return false;
    } else {
        alert("correct");
        output.innerHTML = ""; // sets the error message to display nothing
        return input.value; // sets the variable that called the function to true
    }
}

function pushData(sandwhichOrder,firstName,lastName,cellphone,pickupTime){
   
    alert("push data function");
    alert(sandwhichOrder,firstName,lastName,cellphone,pickupTime);
    console.log("myFunction fired.");
    console.log("Getting Values....");
    console.log("Initialing Airtable API....");
    const Airtable = require('airtable');
   const base = new Airtable({apiKey: 'patwY6S6n46HLiKwj.1d4e32c81f89e803acb9fe34a4bab96b99ddb958003ea93c48a408e25902cdb6'}).base('appnNcJ8zzGXbF7fX');
    console.log("Creating a record....");
    base('Orders').create(
    {
        "First name":firstName,
        "Last name":lastName,
        "Cellphone":cellphone,
        "Pick up time":pickupTime,
        "Sandwhich Order":sandwhichOrder

    }, {typecast: true}, //gets the API to convert types instead of parsing everything as strings.
    function(err, record) {
        if (err) {
            console.error(err);
            return;
        }
    alert("Record created");
        console.log("Record created: " + record.getId());
    });
     // Display the modal
    var myModal = document.getElementById('myModal'); 
    var span = document.getElementsByClassName("close")[0];  	
    myModal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        myModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == myModal) {
            myModal.style.display = "none";
        }
    }
     // Refresh the page after a successful submission
    setTimeout(function() {
        window.scrollTo(0, 0); // Scroll to the top of the page
        location.reload();
    }, 10000);

}

//main program
document.getElementById("submitButton").addEventListener("click",calculateOrder);