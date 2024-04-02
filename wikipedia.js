let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


function showResults(titles) {

    // displyTitle(titles.title);
    // displyDescription(titles.description);
    // displyLink(titles.link);

    let breakLine = document.createElement("br");
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    let anchorTag = document.createElement("a");
    anchorTag.classList.add("result-title");
    anchorTag.target = "_blank";
    anchorTag.href = titles.link;
    anchorTag.textContent = titles.title;
    resultContainer.appendChild(anchorTag);
    searchResult.appendChild(resultContainer);
    resultContainer.appendChild(breakLine);

    let ulr = document.createElement("a");
    ulr.classList.add("result-url");
    ulr.target = "_blank";
    ulr.href = titles.link;
    ulr.textContent = titles.link;

    resultContainer.appendChild(ulr);

    let desContent = document.createElement("p");
    desContent.classList.add("link-description");
    desContent.textContent = titles.description;

    resultContainer.appendChild(desContent);

}

function displyResults(results) {
    spinner.classList.toggle("d-none");
    for (let titles of results) {
        showResults(titles);
    }

}

function getSearchResults(event) {

    if (event.key === "Enter") {
        searchResult.textContent = "";
        spinner.classList.toggle("d-none");

        let searchValue = event.target.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;

        let options = {

            method: "GET"
        }

        fetch(url, options)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displyResults(search_results);
                }
            );
    }
}
searchInput.addEventListener("keydown", getSearchResults)