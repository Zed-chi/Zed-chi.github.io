/* GLOBAL SHIT */
const URL = "http://worriedlazyatom--zedchi.repl.co";
let AUTH = "";

function template(name, id) {
    return `
    <p>
        <span>${name}</span>
        <i class="glyphicon glyphicon-remove" id="${id}"></i>
    </p>`;
};

function setAuthHeader() {
    const code = $(".keycode__input").val();
    if (code) {
        AUTH = code;
    }
}

function fetchWatchItems() {
    const jqxhr = $.getJSON(`${URL}/films`)
        .done((data) => {
            for (var row of data["rows"]) {
                $(".list").append(template(row["name"], row["id"]));
            }
        })
        .fail((err) => {
            console.log(err);
        });
}

function postWatchItem() {
    const title = $("#todo").val();
    if (title && AUTH) {
        $.ajax({
            url: `${URL}/films`,
            headers: {
                "authorization": AUTH,
                "Access-Control-Allow-Origin": "*",
            },
            type: "POST",
            method: "post",
            crossOrigin: true,
            accept: "application/json",
            dataType: "json",
            data: {
                "name": title,
            },
            success: (data) => {
                $(".list").append(template(title, data["row"]["id"]));
                $("#todo").val("");
            },
        });
    }
}

function deleteWatchItem(id, parent) {3
    console.log("1");
    if (id && AUTH && parent) {
        console.log("2");
        $.ajax({
            url: `${URL}/film/${id}`,
            headers: {
                "authorization": AUTH,
                "Access-Control-Allow-Origin": "*",
            },
            type: "delete",
            method: "delete",
            crossOrigin: true,
            accept: "application/json",
            dataType: "json",
            success: (data) => {
                parent.remove();
            },
        });
    }
}

function main() {
    $("form").submit(() => {
        postWatchItem();
        return false;
    });
    $(".main").on("click", ".glyphicon-star", () => $(this).toggleClass("active"));
    $(".main").on("click", ".glyphicon-remove", (e) => {        
        var id = e.target.getAttribute("id");
        var parent = e.target.parentElement;
        console.log(id, parent);
        deleteWatchItem(id, parent);
    });
    $(".keycode").on("click", ".keycode__button", setAuthHeader);
    fetchWatchItems();
};

$(document).ready(main);
