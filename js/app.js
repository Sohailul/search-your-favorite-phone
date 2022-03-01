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
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand Name: ${phone.brand}</p>
            </div>
            <div class="card-footer"><button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button></div>
        </div>
    `;
        searchResult.appendChild(div);
    };

}

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = phone =>  {
    console.log(phone);
    const phoneDetailsDiv = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <h6 class="card-title">Release Date: ${phone.releaseDate}</h6>
                <h6 class="card-text">Brand Name: ${phone.brand}</h6>
                <h6 class="card-text">Main Features: <ul>
                <li>Storage: ${phone.mainFeatures.storage}</li>
                <li>Display Size: ${phone.mainFeatures.displaySize}</li>
                <li>chip Set: ${phone.mainFeatures.chipSet}</li>
                <li>Memory: ${phone.mainFeatures.memory}</li>
                <li>sensors: ${phone.mainFeatures.sensors}</li>
                </ul></h6>
            </div>
        </div>
    `;
    phoneDetailsDiv.appendChild(div);
}