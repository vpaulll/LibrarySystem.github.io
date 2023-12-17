function changeModalHeaderColor(status){
    let modalHeader = document.getElementById('modal-header');
    modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-danger');

    switch (status) {
        case 'ongoing':
            modalHeader.classList.add('bg-warning');
                break;
        case 'On Queue':
            modalHeader.classList.add('bg-secondary');
                break;      
        case 'completed':
            modalHeader.classList.add('bg-success');
                break;      
        default:    
            modalHeader.classList.add('bg-danger');
                break;                    
    }
}

function assignRowFieldvalues(row){
    let columns     = row.getElementsByTagName('td');
    let ticketNo    = row.getElementsByTagName('th');

    let title       = document.getElementById('request-title');
    let description = document.getElementById('ticket-description');
    let dateCreated = document.getElementById('date-created');
    let targetDate  = document.getElementById('target-date');
    let requestedBy = document.getElementById('requested-by');
    let assignedTo  = document.getElementById('assigned-to');
    let department  = document.getElementById('department');
    let category    = document.getElementById('category');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let status      = document.getElementById('field-status');
    const statusArray = ['ongoing', 'on queue' , 'completed' , 'overdue'];

    title.value             = columns[0].textContent;
    requestedBy.value       = columns[1].textContent;
    department.value        = columns[2].textContent;
    dateCreated.value       = columns[3].textContent;
    targetDate.value        = columns[4].textContent;
    category.value          = columns[5].textContent;
    status.value            = columns[6].textContent;
    modalTitle.textContent  = ticketNo[0].textContent;

    changeModalHeaderColor(columns[6].textContent);   

}

function showHideModalButtons(row, state = ''){
    const status  =  row.getElementsByTagName('td')[6].innerHTML;
    const modalMain = document.querySelector('#viewTicketModal');
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
    removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });

    if(status.includes("On Queue")){
        if(state == ""){
            showBtns = modalMain.querySelector("#modal-btn-process");
            showBtns.classList.remove('d-none');
        } else {
            showBtns = modalMain.querySelector("#modal-btn-save");
            showBtns.classList.remove('d-none');
        }
       
    }else if(status.includes("ongoing")) {
        if(state == ""){
            showBtns = modalMain.querySelector("#modal-btn-complete");
            showBtns.classList.remove('d-none');
        } else {
            showBtns = modalMain.querySelector("#modal-btn-save");
            showBtns.classList.remove('d-none');
        }
    }
}

// MAIN CONNTENT

document.addEventListener('DOMContentLoaded',function() {
    let activeRow = null;
    
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        if(columns[6].textContent == 'completed') {
            let removeButtons = columns[7].querySelectorAll(".btn-warning,.btn-danger");
            removeButtons[0].classList.add('d-none'); //Edit
            removeButtons[1].classList.add('d-none'); //Edit
        }
    });

});
    //View BUTTON
    viewButton = document.querySelectorAll('.view-ticket');
    viewButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;

            assignRowFieldvalues(row);
            showHideModalButtons(row);
    });
});
    
    // Modal-Save Button
    mdlSaveButton = document.querySelector('#modal-btn-save');
    mdlSaveButton.addEventListener('click', function(){
        const columns  = activeRow.querySelectorAll('td');
        const modalMain = document.querySelector('#viewTicketModal');

        columns[0].textContent = modalMain.querySelector('#request-title').value 
        columns[1].textContent = modalMain.querySelector('#requested-by').value 
        columns[2].textContent = modalMain.querySelector('#department').value 
        columns[3].textContent = modalMain.querySelector('#date-created').value
        columns[4].textContent = modalMain.querySelector('#target-date').value  
        columns[5].textContent = modalMain.querySelector('#category').value  
    });

    // DELETE BUTTON

    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            const modalDelete = document.querySelector("#deleteTicketModal");	
            const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
            confirmDelBtn.addEventListener("click", function(){	// ACTUAL DELETE
                row.remove();


            });
        });
    });

    //EDIT BUTTON
    editButton = document.querySelectorAll('.edit-ticket');
    editButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            activeRow = row;
            assignRowFieldvalues(row);

            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status" && input.id != "date-created" ) input.removeAttribute("disabled");
            
            });
            showHideModalButtons(row, "edit");
    });
    

    // HIDDEN / CLOSE EVENT

    modalWindow =  document.querySelector('#viewTicketModal');
    modalWindow.addEventListener("hidden.bs.modal", function(){
        const inputFields = document.querySelectorAll(".form-control");
        inputFields.forEach(input => {
           input.setAttribute("disabled","");
        });
    }) 
    
});