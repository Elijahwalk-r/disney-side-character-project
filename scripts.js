//PSEUDO CODE

//set up my app
//
//1. Get a list of disney characters via an API, that provides images and names
//2. User can select which disney character they want in a dropdown 
//3. User will be able to see the disney characters name and img once they click submit 
//4. User will then see the disney character they selected with name


const app = {};

//my init method
app.init = function () {
    //test code 
    console.log("eli can u see");
    //calling my then function
    app.getDisney();
};

//namespace
app.disneyUrl = `https://api.disneyapi.dev/characters`;
app.$dropdown = $("#dropdown");
app.$container = $(".super-hero");
app.$button = $("#click-here");

//first ajax call inside of a function, with a then that gives a list of all characters
app.getDisney = function () {
    const heroResponse = $.ajax({
        url: `${app.disneyUrl}`,
        method: "GET",
        dataType: "json",
        //giving me an array of all the different disney characters
    }).then((results) => {

        const disneyCharacterResults = results.data
        //map method giving me an array of all the disney characters names

        const htmlToAppend =
            disneyCharacterResults.map((results) => {
                //showing me the name of the disney characters
                return `<option value="${results._id}">${results.name}</option>`;
            });
        app.$dropdown.append(htmlToAppend);
    });
};
//event listener 

app.$dropdown.on('click', () => {
    app.selection = $("option:selected").val();
    //MAKE A BUTTON THAT HOLDS THIS LOGIC
    app.getDisneyPic = function () {
        const heroResponse = $.ajax({
            url: `${app.disneyUrl}/${app.selection}`,
            method: "GET",
            dataType: "json",
            //giving me an array of all the different disney characters
        }).then((results) => {
            app.disneyObject = results;
            // created html elements through jquery
            const htmlToAppend = `
            <div>
                <h3 class="title-name">${app.disneyObject.name}</h3>
                <div class="image-flex">
                    <img class="image-size" src=${app.disneyObject.imageUrl} alt="Picture of ${app.disneyObject.name}"/> 
                </div>
            </div>`;
            app.$container.append(htmlToAppend);
        });
    };
    // getDisneyPic();
});
//HTML CREATED ELEMENT TO HOLD PICTURE
app.$button.on('click', () => {
    app.$container.empty();
    app.getDisneyPic();
});
//my document ready to store all my info using common practice of only having my init stored inside. 
$(document).ready(function () {
    app.init();
});