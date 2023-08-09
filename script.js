const inputEl = document.getElementById('keywordInput')
const formEl = document.getElementById('form')
const resultEl = document.getElementById('result')

form.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const keywordInput = document.getElementById("keywordInput");
    const keyword = keywordInput.value;
    resultEl.textContent = "Loading..."
    const searchVolume = await fetchData(keyword);
    resultEl.textContent = searchVolume;
});

async function fetchData(value) {
    const url = 'https://himanshu-keyword-search.onrender.com/getTotalViewCount?searchKeyword=' + value;
    console.log(url);
    const requestBody = {
        searchKeyword: value
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.totalViewCount
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

