const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if (searchText == '') {
        document.getElementById('error-message').style.visibility = 'visible';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data));
    }
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    for(const phone of phones){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand Name: ${phone.brand}</p>
            </div>
        </div>
    `;
        searchResult.appendChild(div);
    };
}