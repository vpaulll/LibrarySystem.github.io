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
    button.addEventListener('click', function()
    {
        let row         = this.parentElement.parentElement;
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


        title.value = columns[0].textContent;
        requestedBy.value = columns[1].textContent;
        department.value = columns[2].textContent;
        dateCreated.value = columns[3].textContent;
        targetDate.value = columns[4].textContent;
        category.value   = columns[5].textContent;
        modalTitle.textContent = ticketNo[0].textContent;
    });
});

