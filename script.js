//your JS code here. If required.
// Wait for the DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function () {
    const typeaheadInput = document.getElementById('typeahead');
    const suggestionsList = document.getElementById('suggestions-list');
    let timeoutId;

    // Function to clear suggestions
    function clearSuggestions() {
        suggestionsList.innerHTML = '';
    }

    // Function to handle API request
    async function fetchSuggestions(text) {
        try {
            const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${text}`);
            const data = await response.json();
			console.log(data);
            displaySuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    // Function to display suggestions
    function displaySuggestions(suggestions) {
        clearSuggestions();
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    }

    // Event listener for typeahead input
    typeaheadInput.addEventListener('input', function (event) {
        const text = event.target.value.trim();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (text.length > 0) {
                fetchSuggestions(text);
            } else {
                clearSuggestions();
            }
        }, 500);
    });

    // Event listener for suggestion click
    suggestionsList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            typeaheadInput.value = event.target.textContent;
            clearSuggestions();
        }
    });

    // Event listener for clearing input
    typeaheadInput.addEventListener('keyup', function (event) {
        if (event.key === 'Backspace' && typeaheadInput.value === '') {
            clearSuggestions();
        }
    });
// });
