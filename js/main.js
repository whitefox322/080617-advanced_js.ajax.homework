var form = document.querySelector("#myForm");

var xhr = new XMLHttpRequest();
xhr.open("get", "/package.json");
xhr.responseType = "json";

xhr.addEventListener("readystatechange", function () {
    if (this.readyState !== this.DONE) {
        return;
    }

    for (var count = 0; count < this.response.questions.length; count++) {
        var li = document.querySelector("#item" + (count + 1));

        if (this.response.questions[count].question) {
            var label = document.querySelector("#label" + (count + 1));
            label.textContent = this.response.questions[count].question;

        } else if (this.response.questions[count].type === "input") {
            var input = document.createElement(this.response.questions[count].type);
            input.required = true;
            li.appendChild(input);

        } else if (this.response.questions[count].type === "select") {
            var select = document.createElement(this.response.questions[count].type);

            for (var i = 0; i < this.response.questions[count].answer.length; i++) {
                var option = document.createElement("option");
                option.textContent = this.response.questions[count].answer[i];
                select.appendChild(option);
                li.appendChild(select);
            }
        }
    }
});

xhr.send();

form.addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
        alert("Please, enter your name!");
    } else {
        alert("Success");
    }

    e.preventDefault();
});



