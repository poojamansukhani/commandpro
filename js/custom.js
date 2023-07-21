  // JavaScript Document
  $(document).ready(function(){
    $(window).scrollTop(0);
    //Wow Animation
    new WOW().init();
    //Hide New Action
    $("#hideBtn").click(function() {
        // Hide the targeted div
        $("#new-section").hide(1000);
        $("#showBtn").show(1000);
        
    });
    $("#showBtn").click(function(){
        $("#new-section").show(1000);
        $("#showBtn").hide(1000);
    })
  
});
let listContainer = document.getElementById('listContainer');
let listHTML = "";
const submitListForm = document.getElementById("submitListForm")
const selectStatus = document.getElementById('status');
const loader = document.getElementById('loader');
const selectHours = document.getElementsByClassName('hr');
const selectMinutes = document.getElementsByClassName('min');
const selectStatusFirst = document.getElementById('status');
const close = document.getElementById('close');
const cancel = document.getElementById('cancel')
const items = [
    {
        title:"Lorem Ipsum",
        forPOC:"HON CIRCLE;",
        pocBriefed:"Miles & More",
        startDate:"1/29/2010 6:30:00 PM",
        targetDate:"1/29/2010 6:30:00 PM",
        actualDate:"1/29/2010 6:30:00 PM"
    },
    {
        title:"Lorem Ipsum 1",
        forPOC:"HON CIRCLE;",
        pocBriefed:"Miles & More",
        startDate:"1/29/2010 6:30:00 PM",
        targetDate:"1/29/2010 6:30:00 PM",
        actualDate:"1/29/2010 6:30:00 PM"
    },
    {
        title:"Lorem Ipsum 2",
        forPOC:"HON CIRCLE;",
        pocBriefed:"Miles & More",
        startDate:"1/29/2010 6:30:00 PM",
        targetDate:"1/29/2010 6:30:00 PM",
        actualDate:"1/29/2010 6:30:00 PM"
    },
    {
        title:"Lorem Ipsum 3",
        forPOC:"HON CIRCLE;",
        pocBriefed:"Miles & More",
        startDate:"1/29/2010 6:30:00 PM",
        targetDate:"1/29/2010 6:30:00 PM",
        actualDate:"1/29/2010 6:30:00 PM"
    }
];
function removeElement(id){
    items.splice(id,1)
    createItemList();
}

function createItemList(){
        listHTML = items.map((item, index) => `
        <div class="col-md-6 mb-4 wow fadeIn">
                        <div class="list-box shaded-bg rounded">
                            <div class="d-flex">
                                <h4>${index+1}.</h4>
                                <div class="pl-1">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <h4>${item.title}</h4>
                                        <ul class="list-unstyled d-flex align-items-center action-btn">
                                            <li><button class="btn btn-link"><i class="fa fa-edit"></i></button></li>
                                            <li><button class="btn btn-link" onClick="removeElement(${index})"><i class="fa fa-trash"></i></button></li>
                                        </ul>
                                    </div>
                                    <ul class="list-unstyled d-flex align-items-top flex-wrap listing-items row">
                                        <li class="col-md-6 mb-2"><strong>For/Poc:</strong> ${item.forPOC} </li>
                                        <li class="col-md-6 mb-2"><strong>POC Briefed:</strong>${item.pocBriefed}</li>
                                        <li class="col-md-6 mb-2"><strong>Start Date:</strong>${item.startDate}</li>
                                        <li class="col-md-6 mb-2"><strong>Target Date:</strong>${item.targetDate}</li>
                                        <li class="col-md-6 mb-2"><strong>Actual Date:</strong>${item.actualDate}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
        `).join('');
        listContainer.innerHTML = listHTML;
}
createItemList();
submitListForm.addEventListener('submit', (e)=>{
    loader.style.display = 'flex';
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    //Push data to lists
     let startDate = `${formDataObj.dateStart} ${convertToAMPM(formDataObj.hr+":"+formDataObj.min)})`
     console.log(startDate)
     setTimeout(() => {
        items.push({
            title:"Lorem Ipsum",
            forPOC:formDataObj.forPOC,
            pocBriefed:formDataObj.pocB,
            startDate:formDataObj.dateStart +" "+ formDataObj.hr +":"+formDataObj.min,
            targetDate:"",
            actualDate:""
        
    })
    loader.style.display = 'flex';
    window.location.href = './success.html'; 
     },2000)
    
    
    console.log(items)
})
function populateHours() {
    for (let i = 1; i <= 24; i++) {
        const option = document.createElement('option');
        option.textContent = i.toString().padStart(2, '0'); // Add leading zero for single-digit values
        option.value = i;
        for (const selectElement of selectHours) {
            selectElement.appendChild(option.cloneNode(true));
        }
    }
}
function populateMinutes() {
    for (let i = 0; i <= 59; i++) {
        const option = document.createElement('option');
        option.textContent = i.toString().padStart(2, '0'); // Add leading zero for single-digit values
        option.value = i;

        // Loop through all elements with the class 'minutes' and add options to each element
        for (const selectElement of selectMinutes) {
            selectElement.appendChild(option.cloneNode(true));
        }
    }
}

populateHours();
populateMinutes();

selectStatus.addEventListener('change', (event) => {
    // Get the selected option
    const selectedOption = event.target.value;
    if(selectedOption === "done"){
        $("#confirmationPopUp").modal();
    }
});
$(function () {
    $('.datepicker').datepicker({
      language: "es",
      autoclose: true,
      format: "dd/mm/yyyy"
    });
  });
  
//   function cancel(){
//         cancel.addEventListener('click', function(){
//         submitListForm.reset()
//         })
//     }
  


  function convertToAMPM(time24) {
    // Split the time into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = (hours % 12) || 12;

    // Format the time in AM/PM format
    const time12 = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

    return time12 + ":00";
}
//on click of close select by default option 
function selectFirstOption() {
    selectStatusFirst.selectedIndex = 0;
}
close.addEventListener('click', selectFirstOption);