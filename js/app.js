const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if(searchText == ''){
        document.getElementById('error-message').style.visibility = 'visible';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));
    }
}
