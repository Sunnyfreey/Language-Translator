const langFrom = document.querySelector(".lang-from"),
langTo = document.querySelector(".lang-to"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
transBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");


selectTag.forEach((tag, id)=> {
    for (const country_code in countries) {
        //Selecting English and Spanish as default in the Language from and Language to respectively
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        }else if (id == 1 && country_code == "es-ES") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding option tag into the select tag     
    }
});

exchangeIcon.addEventListener("click", () => {
    let tempLang = langFrom.value,
    tempLangSel = selectTag[0].value;
    langFrom.value = langTo.value;
    selectTag[0].value = selectTag[1].value;
    langTo.value = tempLang;
    selectTag[1].value = tempLangSel;
});

transBtn.addEventListener("click", () => {
    let text = langFrom.value;
    languageFrom = selectTag[0].value;
    languageTo = selectTag[1].value;
    if(!text) return;
    langTo.setAttribute("placeholder", "Translating...");
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${languageFrom}|${languageTo}`;
    //fetching api response
    fetch(apiURL).then(res => res.json()).then(data => {
        langTo.value = data.responseData.translatedText;
        langTo.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from"){
                navigator.clipboard.writeText(langFrom.value);
            }else {
                navigator.clipboard.writeText(langTo.value);
            }
        }else {
                let tone;
                if(target.id == "from"){
                    tone = new SpeechSynthesisUtterance(langFrom.value);
                    tone.lang = selectTag[0].value;
                }else {
                    tone = new SpeechSynthesisUtterance(langTo.value);
                    tone.lang = selectTag[1].value;
                } 
                speechSynthesis.speak(tone); 
            }
    });
});