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
            .then(data => displaySearchResult(data.data.slice(0,20)));
    }
}

//Display spinner
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.visibility = displayStyle;
}
const toggleSearchResult = displayStyle =>{
    document.getElementById('search-result').style.visibility = displayStyle;
}


const displaySearchResult = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    //Spinner
    toggleSpinner('visible');
    toggleSearchResult('hidden');
    searchResult.textContent = '';
    if(phones.length == 0){
        document.getElementById('not-found').style.visibility = 'visible';
    }
        for (const phone of phones) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 border-success">
                <img src="${phone.image}" class="card-img-top w-50 rounded mx-auto d-block" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                </div>
                <div class="card-footer text-center"><button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success">Show Details</button></div>
            </div>
        `;
            searchResult.appendChild(div);
        };

        //spinner
    toggleSpinner('hidden');
    toggleSearchResult('visible');

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
    phoneDetailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50 rounded mx-auto d-block" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <h6 class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate:'Released Date Not Found'} </h6>
                <h6 class="card-text">Brand Name: ${phone.brand}</h6>
                <h6 class="card-text">Main Features: <ul>
                <li>Storage: ${phone.mainFeatures.storage}</li>
                <li>Display Size: ${phone.mainFeatures.displaySize}</li>
                <li>Chip Set: ${phone.mainFeatures.chipSet}</li>
                <li>Memory: ${phone.mainFeatures.memory}</li>
                <li>Sensors: ${phone.mainFeatures.sensors}</li>
                </ul></h6>
                <h6>Others:
                <ul>
                <li>Bluetooth: ${phone.others.Bluetooth}</li>
                <li>GPS: ${phone.others.GPS}</li>
                <li>NFC: ${phone.others.NFC}</li>
                <li>Radio: ${phone.others.Radio}</li>
                <li>USB: ${phone.others.USB}</li>
                <li>WLAN: ${phone.others.WLAN}</li>
                </ul>
                </h6>
            </div>
        </div>
    `;
    phoneDetailsDiv.appendChild(div);
}