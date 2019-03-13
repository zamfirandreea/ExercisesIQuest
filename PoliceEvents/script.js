const createPage = async () => {
    const events = await getEventsData();
    createEventList(events);
};

const getEventsData = async () => {
    try {
        const response = await axios.get('https://data.police.uk/api/leicestershire/NC66/events');
        return response.data;
    } catch(error) {
        console.log(error);
    }
};

const createEventList = (events) => {
    const table = document.createElement('table');
    createTableHeader(table);
    events.forEach(event => {
        createEventRow(event, table);
    });
    document.body.appendChild(table);
};

const createTableHeader = (table) => {
  const tableRow = document.createElement('tr');
  const tableColName = document.createElement('th');
  const tableColAddress = document.createElement('th');

  tableColName.innerHTML = 'Event Title';
  tableColAddress.innerHTML = 'Event Address';

  tableRow.appendChild(tableColName);
  tableRow.appendChild(tableColAddress);
  table.appendChild(tableRow);
};

const createEventRow = (event, table) => {
    const tableRow = document.createElement('tr');
    const tableColName = document.createElement('td');
    const tableColAddress = document.createElement('td');

    tableColName.innerHTML = event.title;
    tableColAddress.innerHTML = event.address;

    tableRow.appendChild(tableColName);
    tableRow.appendChild(tableColAddress);
    table.appendChild(tableRow);
};

createPage();