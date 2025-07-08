import { currency_list, api } from "./currencyCodes.js";

// Helper: Get flag image URL
function getFlagUrl(countryCode) {
    if (!countryCode) return "";
    if (countryCode === 'EU') return "https://flagcdn.com/eu.svg";
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
}

// Helper: Get currency object by code
function getCurrencyObj(code) {
    return currency_list.find(c => c[0] === code);
}

// Custom Dropdown with search box
function createDropdown(containerId, defaultCode, onChange) {
    const container = document.getElementById(containerId);

    let selectedCode = defaultCode;
    let selectedCurrency = getCurrencyObj(selectedCode);

    // Selected box
    const selectedDiv = document.createElement('div');
    selectedDiv.className = 'dropdown-selected';
    selectedDiv.tabIndex = 0;

    // Arrow
    const arrow = document.createElement('span');
    arrow.className = 'dropdown-arrow';
    arrow.textContent = '▼';

    // Search box
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.className = 'dropdown-search-box';
    searchBox.placeholder = 'Search country/currency...';

    // List
    const list = document.createElement('div');
    list.className = 'dropdown-list';

    // Save all option divs for filter
    let optionDivs = [];

    // Fill options
    function fillOptions() {
        list.innerHTML = '';
        list.appendChild(searchBox);
        optionDivs = [];
        currency_list.forEach((currency) => {
            const [code, name, countryCode, symbol] = currency;
            const searchText = `${code} ${name} ${countryCode} ${symbol}`;
            const optionDiv = document.createElement('div');
            optionDiv.className = 'dropdown-option';
            optionDiv.dataset.code = code;
            optionDiv.dataset.search = searchText.toLowerCase();

            // Flag image
            const flagImg = document.createElement('img');
            flagImg.className = 'flag-img';
            flagImg.src = getFlagUrl(countryCode);
            flagImg.alt = countryCode || '';
            optionDiv.appendChild(flagImg);

            // Text
            const label = document.createElement('span');
            label.textContent = `${code} - ${name} ${symbol ? '('+symbol+')' : ''}`;
            optionDiv.appendChild(label);

            // Select handler
            optionDiv.onclick = function(e) {
                e.stopPropagation();
                selectedCode = code;
                selectedCurrency = currency;
                updateSelected();
                container.classList.remove('open');
                if (typeof onChange === 'function') onChange(selectedCode);
                searchBox.value = '';
                filterOptions('');
            };

            optionDivs.push(optionDiv);
            list.appendChild(optionDiv);
        });
    }
    fillOptions();

    // Search filter
    function filterOptions(value) {
        const v = value.trim().toLowerCase();
        optionDivs.forEach(opt => {
            opt.style.display = opt.dataset.search.includes(v) ? '' : 'none';
        });
    }
    searchBox.addEventListener('input', e => filterOptions(e.target.value));

    // Update selected display
    function updateSelected() {
        const [code, name, countryCode, symbol] = selectedCurrency;
        selectedDiv.innerHTML = '';
        const flagImg = document.createElement('img');
        flagImg.className = 'flag-img';
        flagImg.src = getFlagUrl(countryCode);
        flagImg.alt = countryCode || '';
        selectedDiv.appendChild(flagImg);
        const label = document.createElement('span');
        label.textContent = `${code} - ${name} ${symbol ? '('+symbol+')' : ''}`;
        selectedDiv.appendChild(label);
        selectedDiv.appendChild(arrow);

        // Highlight selected in list
        optionDivs.forEach(opt => {
            if (opt.dataset.code === code) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    // Toggle dropdown
    selectedDiv.onclick = function(e) {
        e.stopPropagation();
        document.querySelectorAll('.custom-dropdown').forEach(dd => {
            if (dd !== container) dd.classList.remove('open');
        });
        container.classList.toggle('open');
        if (container.classList.contains('open')) {
            searchBox.focus();
            filterOptions('');
        }
    };

    // Don't close dropdown when clicking inside the dropdown-list
    list.onclick = function(e) {
        e.stopPropagation();
    };

    // Render
    container.innerHTML = '';
    container.appendChild(selectedDiv);
    container.appendChild(list);

    updateSelected();

    // API for outside to get/set value
    return {
        get value() { return selectedCode; },
        set value(val) {
            const c = getCurrencyObj(val);
            if (c) {
                selectedCode = val;
                selectedCurrency = c;
                updateSelected();
            }
        },
        get symbol() { return selectedCurrency[3]; }
    };
}

// ---- Main Variables ----
const fromDropdown = createDropdown('fromDropdown', 'USD', syncSelects);
const toDropdown = createDropdown('toDropdown', 'INR', syncSelects);
const btn = document.querySelector("#btn");
const status = document.querySelector("#status");
const resultTag = document.querySelector("#result");

// For swapping currencies
document.getElementById("switchCurrency").onclick = () => {
    const temp = fromDropdown.value;
    fromDropdown.value = toDropdown.value;
    toDropdown.value = temp;
    syncSelects();
};

function syncSelects() {
    // Hook for any extra logic
}

// Convert button
btn.onclick = () => {
    const numberInputField = document.getElementById("userValue");
    const userEnteredAmount = numberInputField.value;

    if (userEnteredAmount < 1 || isNaN(userEnteredAmount)) {
        numberInputField.style.border = "1px solid red";
        resultTag.style.color = "red";
        resultTag.textContent = "Error: Only numeric values greater than 0 are allowed.";
    }
    else {
        numberInputField.style.border = "1px solid gray";
        resultTag.style.color = "black";
        btn.textContent = "Processing: Please wait...";

        btn.disabled = true;
        btn.style.color = "gray";
        btn.style.cursor = "not-allowed";

        convertAmount(userEnteredAmount);
    }
}

function convertAmount(amount) {
    fetchData(`https://v6.exchangerate-api.com/v6/${api}/latest/USD`)
        .then(data => {
            const fromRates = data.conversion_rates[fromDropdown.value];
            const toRates = data.conversion_rates[toDropdown.value];

            const fromSymbol = fromDropdown.symbol;
            const toSymbol = toDropdown.symbol;

            const perRate = (1 * (toRates / fromRates)).toFixed(2);
            const convertedAmount = (amount * (toRates / fromRates)).toFixed(2);

            resultTag.style.color = "black";
            status.textContent = `1 ${fromDropdown.value} (${fromSymbol}) = ${perRate} ${toDropdown.value} (${toSymbol})`;
            resultTag.textContent = `${amount} ${fromDropdown.value} (${fromSymbol}) = ${convertedAmount} ${toDropdown.value} (${toSymbol})`;

            btn.disabled = false;
            btn.style.color = "black";
            btn.style.cursor = "pointer";
            btn.textContent = "Convert";
        })
        .catch(error => console.log(`Additional information about error: ${error}`));
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        resultTag.style.color = "red";
        resultTag.textContent = `Fetch API Error: ${error}`;
        throw error;
    }
}

// Close dropdowns if clicked outside
document.addEventListener('click', (event) => {
    document.querySelectorAll('.custom-dropdown').forEach(dd => {
        if (!dd.contains(event.target)) dd.classList.remove('open');
    });
});