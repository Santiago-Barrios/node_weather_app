const weatherForm = document.querySelector('form');
const search = document.getElementById('inputSearch');
const messageOne = document.getElementById('message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        return response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error ;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forescatData;
        })
    });

});