window.onload = initAll
var submitted = false;

function initAll() {
    console.log("inside init")
    submitted = false;
    document.getElementById("jobApplication").addEventListener("submit", saveAllInfo, false); //add eventlistner when submitt so that data can be saved 
}

const dataArray = {};
    
function saveAllInfo(event)
{
    console.log("info saving")
    event.preventDefault(); // Prevent the default form submission behavior

    const formElements= document.getElementById('jobApplication').elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i]; //get first element and save its data in formdata
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            dataArray[element.id || element.name] = element.value;
        }
    }
    console.log('Form Data:', dataArray);
    submitted = true; // to check either we have data to convert it in table or not 
}


function tableConverter(){
    const data = Object.entries(dataArray); //convert object to array
    if(!submitted) {
        alert("Fill the Form First!");
        return false;
    }
    let form = document.getElementById("jobApplication");
    let div = document.getElementById("tableContainer");
    console.log(data)

    if(div.childNodes.length == 0) // if table doesn't exists
    {
        let applicationTable = document.createElement('table');//create table
        applicationTable.id = "applicationTable"; //give id now its time to append
        div.appendChild(applicationTable);
    }
    
    let table = document.getElementById('applicationTable'); // getting new dynamic table 
    if(table.childNodes.length == 0) //make the headers else not 
    {
        table.appendChild(document.createElement("tr")); // create a row
        let headerRow = document.getElementsByTagName('tr')[0]; // get a row
        for (let i = 0; i < data.length; i++) {
            let header = document.createElement('th');
            header.innerText = document.querySelector(`label[for="${data[i][0]}"]`).textContent.trim();//this get the label of corresponding element
            headerRow.appendChild(header);
        }
        //putting data in row
        table.appendChild(document.createElement("tr")); // create a row
        row = document.getElementsByTagName('tr')[1]; // get row
        
        for (let i = 0; i < data.length; i++) {
                let dataRow = document.createElement('td');
                dataRow.innerText = data[i][1]; 
                row.appendChild(dataRow);
        } 
    }
    else if(table.childNodes.length >= 1)
    {
        table.appendChild(document.createElement("tr")); // create a row
        let row = document.getElementsByTagName('tr'); // get row
        row = row[row.length - 1];
        for (let i = 0; i < data.length; i++) {
            let dataRow = document.createElement('td');
            dataRow.innerText = data[i][1]; 
            row.appendChild(dataRow);
        }
    }

    form.reset();
    submitted = false;
}