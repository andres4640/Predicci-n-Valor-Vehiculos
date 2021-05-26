var pred_boton = document.getElementById("predecir");
pred_boton.addEventListener("click", predecir, true);

var xhr = new XMLHttpRequest();

window.addEventListener("load", function(){
    document.getElementById("resultado-exito").style.display = "none"
    document.getElementById("resultado-fallo").style.display = "none"
})

function predecir(){
    
    var kmUso  = document.getElementById("kmUso").value;
    var gasolina = document.getElementById("gasolina").value;
    var vendedor = document.getElementById("vendedor").value;
    var transmision = document.getElementById("transmision").value;
    var numDuenos = document.getElementById("numDuenos").value;
    var numAsientos = document.getElementById("numAsientos").value;
    var numKilom = document.getElementById("numKilom").value;
    var numPotencia = document.getElementById("numPotencia").value;
    var numEngine = document.getElementById("numMotor").value;
    var numTorque = document.getElementById("numTorque").value;
    var numAntig = document.getElementById("numAntig").value;

    var data_json = {
        "km_driven": kmUso,
        "fuel": gasolina,
        "seller_type": vendedor,
        "transmission": transmision,
        "owner": numDuenos,
        "seats": numAsientos,
        "mileage": numKilom,
        "max_power": numPotencia,
        "engine": numEngine,
        "torque": numTorque,
        "antiguedad": numAntig
    };
    console.log(data_json)
    console.log("Pre-axios")

    // Ingresar URL del API
    var url = "";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            document.getElementById("resultado-exito").style.display = "block"
            document.getElementById("resultado-fallo").style.display = "none"
            document.getElementById("prediccion").innerHTML = json
            console.log(json);
        }
        else{
            document.getElementById("resultado-exito").style.display = "none"
            document.getElementById("resultado-fallo").style.display = "block"
        }
    };
    var data = JSON.stringify(data_json);
    xhr.send(data);
}

jQuery("#predecir").prop('disabled', true);

$('#kmUso , #vendedor, #transmision, #numDuenos, #numAsientos, #numKilom, #numPotencia, #numMotor, #numTorque, #numAntig').bind('change', function () {
    if (allFilled()) $('#predecir').removeAttr('disabled');
    else { $('#predecir').prop("disabled", true); }
});

function allFilled() {
    var filled = true;
    $('body input').each(function () {
        if ($(this).val() == '') filled = false;
    });
    return filled;
}
