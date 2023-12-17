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
    
}

// MAIN CONNTENT

document.addEventListener('DOMContentLoaded',function() {
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
            assignRowFieldvalues(row);
        
    });
    
    
});

    //EDIT BUTTON
    editButton = document.querySelectorAll('.edit-ticket');
    editButton.forEach(function(button){
        button.addEventListener('click', function(){
            let row = this.parentElement.parentElement;
            assignRowFieldvalues(row);

            const inputFields = document.querySelectorAll(".form-control");
            inputFields.forEach(input => {
                if(input.id != "date-completed" && input.id != "field-status" && input.id != "date-created" ) input.removeAttribute("disabled");
            
            });
    });
});