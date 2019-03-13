const createPage = async () => {
    const users = await getUsersData();
    displayUserRepos('zamfirandreea');
    users.map(user => user.login)
        .forEach(username => displayUserRepos(username));
};

const displayUserRepos = async (username) => {
    const repos = await getUserRepos(username);
    createUserTable(username, repos);
};

const getUserRepos = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return response.data.slice(0,3);
    } catch(error) {
        console.log(error);
    }
};

const getUsersData = async () => {
    try {
        const response = await axios.get('https://api.github.com/users');
        return response.data.slice(0,3);
    } catch(error) {
        console.log(error);
    }
};

const createUserTable = (username, repos) => {
    const table = document.createElement('table');
    createTableHeader(table, username);
    repos.forEach(repo => {
        createRepoRow(repo, table);
    });
    document.body.appendChild(table);
};

const createTableHeader = (table, username) => {
    const tableUserRow = document.createElement('tr');
    const tableColUser = document.createElement('th');
    tableColUser.innerHTML = `${username}'s repo`;

    const tableRow = document.createElement('tr');
    const tableColName = document.createElement('th');
    const tableColDescr = document.createElement('th');
    const tableColUrl = document.createElement('th');

    tableColName.innerHTML = 'Repo Name';
    tableColDescr.innerHTML = 'Repo Description';
    tableColUrl.innerHTML = 'Repo URL';

    tableUserRow.appendChild(tableColUser);
    tableRow.appendChild(tableColName);
    tableRow.appendChild(tableColDescr);
    tableRow.appendChild(tableColUrl);
    table.appendChild(tableUserRow);
    table.appendChild(tableRow);
};

const createRepoRow = (repo, table) => {
    const tableRow = document.createElement('tr');
    const tableColName = document.createElement('td');
    const tableColDescr = document.createElement('td');
    const tableColUrl = document.createElement('td');

    tableColName.innerHTML = repo.name;
    tableColDescr.innerHTML = repo.description;
    tableColUrl.innerHTML = repo.url;

    tableRow.appendChild(tableColName);
    tableRow.appendChild(tableColDescr);
    tableRow.appendChild(tableColUrl);
    table.appendChild(tableRow);
};

createPage();