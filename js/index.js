/*
diese Datei enthält die jquery-Funktionen, die für die Benutzungsoberfläche beziehungsweise dem Prototypen 3 implementiert wurden
*/

/* 
hierbei werden die IDs des downButton, languageButton sowie den Modals von dem Information-/ und "changeView"-Button geholt 
*/

var infoModal = document.getElementById("myInfoModal");
var changeViewModal = document.getElementById("myChangeViewModal");
var languageButton = document.getElementById("lngBtn");
var downButton = document.getElementById("downButton");

// für alle Perspektiven werden hierbei deren Default-Position festgehalten.

var top1 = $("#pp1").position().top + "px";
var left1 = $("#pp1").position().left + "px";
var top2 = $("#pp2").position().top + "px";
var left2 = $("#pp2").position().left + "px";
var top3 = $("#pp3").position().top + "px";
var left3 = $("#pp3").position().left + "px";
var top4 = $("#pp4").position().top + "px";
var left4 = $("#pp4").position().left + "px";
var top5 = $("#pp5").position().top + "px";
var left5 = $("#pp5").position().left + "px";

/* 
sobald eine Perspektive in den Hauptbereich gezogen wird, wird dieser Button dem div, der die Perspektive enthält, als Kindknoten hinzugefügt. Dies gilt auch für das Perspektivenvideo, welcher ebenso hinzugefügt wird, wenn die entsprechende Perspektive hereingezogen wird.
*/

var appendBtn = "<button type='button' title='Perspektive minimieren' class='ion-minus'></button>";
var appendVideo = "<video class='video1' onclick='playPause()'>"
                + "<source src='video/mov_bbb.mp4' type='video/mp4'>"
                + "Your browser does not support HTML5 video."
                + "</video>"; 

var currentTime = 0;

/*
wenn der Browser den Prototypen geladen hat, soll erstmal der Vorlagen-Editor mittels dem changeViewModal angezeigt werden.
*/

$(window).ready(function(){
    $(changeViewModal).modal("show");
    
/*
    wird der downButton geklickt so wird geschaut, welche PErspektiven im Footer-Bereich liegen. Dies kann dadurch gesehen werden, ob die Perspektive die Klasse "ion-class", welcher ein Button ist, enthält. Enthält jene Perspektive den Button zum Ein-/ und Ausblenden von Perspektiven im Hauptbereich, so wird diese vom Button zum EIn-/ und Ausblenden der PErspektiven im Footer-Bereich nicht ausgeblendet.
*/
    
    $(downButton).click(function(){
        $(".perspectives").each(function(){
            if(!$(this).children().first().hasClass("ion-minus")){
                if(this.style.display == "none"){
                    this.style.display = "flex";
                    this.style.visibility = "visible";
                    $(downButton).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                }
                else{
                    this.style.display = "none";
                    this.style.visibility = "hidden";
                    $(downButton).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
                }
            }
        });
    });
});

//ändert die Sprachen-Button-Aufschrift zwischen EN und DE.

languageButton.onclick = function(){
    languageButton.innerHTML == "DE" ? languageButton.innerHTML = "EN" : languageButton.innerHTML = "DE";
}

/*
damit werden die Perspektiven draggable(). Wobei auch weitere PArameter übergeben werden, welche das Verhalten der Perspektiven bestimmen.
*/

$('.perspectives').draggable({
    containment: ".dropBar",
    cursor: "move",
    revert: "invalid",
    stack: ".perspectives"

});

/*
die dropBar-Klasse bezeichnet den Hauptbereich auf der mittels der droppable-Funktion die draggable-Elemente der Klasse ".perspectives" angenommen werden können, wobei diese ganzheitlich auf der Fläche im Hauptbereich abgelegt werden, um angenommen zu werden. sobald eine Perspektive im Hauptbereich abgelegt wird, verschwindet die Default-Aufschrift auf diesem Feld. Weiterhin werden dem draggable-Element die resizable-Funktion, der Button zum Ein-/ und Ausblenden der Perspektive sowie das Video hinizugefügt, wobei die auch die Default-Aufschrift der Perspektive mit dem jeweiligen Perspektivennamen verschwindet. Dieses Hinzufügen passiert bei jedem Ziehen und Ablegen einer Perspektive.
*/

$(".dropBar").droppable({
    accept: ".perspectives",
    tolerance: "fit",
    drop: function(events, ui){
        
        //tmp position variable of ui
        var topx;
        var leftx;
        $(".textPosition").hide();
        var draggable = ui.draggable;
        draggable.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        draggable.css("margin-top", 20);
        draggable.css("margin-right", 10);
        draggable.css("margin-bottom", 10);
        draggable.css("margin-left", 5);
        
        if(draggable.children().first().is("button")){
            
           draggable.children().first().remove();
        }
        if(draggable.find(".video1").length){
           draggable.find(".video1").remove();
        }
        draggable.find("p").hide();
        draggable.prepend(appendBtn);
        draggable.append(appendVideo);

/* 
sobald eine Perspektive abgelegt wird, wird das Wiedergabezeitpunkt aller Perspektiven im Hauptbereich, welche nun auch die Klasse "video1" haben, auf 0 datiert, das heißt alle Perspektiven starten vom Anfang wieder.
*/        

        $(".video1").each(function(){
            this.currentTime = 0;
            this.pause();
        });
        var x_childeNode = draggable.children().first();

/*
klickt man bei den Perspektiven auf den Button zum Ein-/ und Ausblenden der Perspektiven, so wird die Perspektive zu ihrer Default-Position gezogen. Da alle Default-Positionen zu anfangs gespeichert wurden.
*/
        
        x_childeNode.click(function(){
            var parentDiv = $(this).closest("div");
            switch (parentDiv.attr("id").substr(2)){
                case "1":
                    topx = top1;
                    leftx = left1;
                    break;
                case "2":
                    topx = top2;
                    leftx = left2;
                    break;
                case "3":
                    topx = top3;
                    leftx = left3;
                    break;
                case "4":
                    topx = top4;
                    leftx = left4;
                    break;
                case "5":
                    topx = top5;
                    leftx = left5;
                    break;
            }

/*
Beim Ausblenden wird die draggable sowie resizable-Funktion der jeweiligen Perspektive disabled. Soabld sich die PErspektive auf der Default-Position befindet, wird das video von der Perspektive entfernt und die PErspektive-Aufschrift mit dem INhalt der Perspektive aufgesetzt.
*/
            $(this).remove();
            draggable.find("p").show();
            if(parentDiv.find(".video1").length){
                parentDiv.find(".video1").remove(".video1");
            }
            parentDiv.resizable({
                handles : "",
                disabled: true
            });
            $(parentDiv).animate({
                top: topx ,
                left: leftx,
                width: "180px",
                height: "95px",
                margin: "4%"
            })  ;
            checkEmptyDropZone();

/*
ist der Button zum Ausblenden der passiven PErspektiven betätigt, so soll die weggeklickte Perspektive auch nicht angezeigt werden, wenn sie auf ihre DEfault-Position im Footer-Bereich gezogen wird.
*/
            
            if($(downButton).hasClass("glyphicon-chevron-up")){
                draggable.css("display", "none");
                draggable.css("visibility", "hidden");
               }
        });
     }
});

/*
Die "checkEmptyDropZone"-Funktion soll schauen, ob sich Perspektiven auf dem Hauptbereich befinden. Tun die das nicht, so soll die Aufschrift der "Ablagefläche" im Hauptbereich wieder angeziegt werden.
*/

function checkEmptyDropZone(){
    var passivePerspectives = 0;
    
    $(".perspectives").each(function(){
        if(!$(this).children().first().hasClass("ion-minus")){
            passivePerspectives++;
        }
    });
        
    if(passivePerspectives >= 5){
        $(".textPosition").show();
      }
}

/*
Diese Funktion soll schauen, welche Perspektivendarstellung aus dem Vorlagen-Editor ausgewählt wurde. Sobald eines ausgwählt wird, soll der Perspektive die resizable-Funktion hinzugefügt werden.
*/

$(".view_i").click(function(){
    var viewDiv = $(this).attr("id"),
        pp1 = $("#pp1"),
        pp2 = $("#pp2"),
        pp3 = $("#pp3"),
        pp4 = $("#pp4");
    setDefaultView();
    appendResizeDiv(viewDiv, pp1, pp2, pp3, pp4);
    
    if(viewDiv == "view1"){
        pp1.css({
            top : -430,
            left: 40,
            width: "500px",
            height: "390px"
        });
        pp2.css({
            top: -430,
            left: 360,
            width: "450px",
            height: "180px"
        });
        pp3.css({
            top: -220,
            left: 150,
            width: "450px",
            height: "180px"
        });
    }
    if(viewDiv == "view2"){
        pp1.css({
            top : -430,
            left: 500,
            width: "500px",
            height: "390px"
        });
        pp2.css({
            top: -430,
            left: -200,
            width: "450px",
            height: "180px"
        });
        pp3.css({
            top: -220,
            left: -413,
            width: "450px",
            height: "180px"
        });
    }
    if(viewDiv == "view3"){
        pp1.css({
            top : -430,
            left: 260,
            width: "525px",
            height: "200px"
        });
        pp2.css({
            top: -210,
            left: 323,
            width: "250px",
            height: "170px"
        });
        pp3.css({
            top: -210,
            left: -167,
            width: "250px",
            height: "170px"
        });
    }
    if(viewDiv == "view4"){
        pp1.css({
            top : -430,
            left: 25,
            width: "475px",
            height: "390px"
        });
        pp2.css({
            top: -430,
            left: 320,
            width: "475px",
            height: "390px"
        });
    }
    if(viewDiv == "view5"){
        pp1.css({
            top : -430,
            left: 55,
            width: "450px",
            height: "180px"
        });
        pp2.css({
            top: -430,
            left: 325,
            width: "450px",
            height: "180px"
        });
        pp3.css({
            top: -220,
            left: -372,
            width: "450px",
            height: "180px"
        });
        pp4.css({
            top: -220,
            left: -100,
            width: "450px",
            height: "180px"
        });
    }
    if(viewDiv == "view6"){
        pp1.css({
            top : -370,
            left: 35,
            width: "300px",
            height: "250px"
        });
        pp2.css({
            top: -370,
            left: 158,
            width: "300px",
            height: "250px"
        });
        pp3.css({
            top: -370,
            left: 280,
            width: "300px",
            height: "250px"
        });
    }
    if(viewDiv == "view7"){
        pp1.css({
            top : -430,
            left: 40,
            width: "960px",
            height: "390px"
        });
    }   
});

/*
Diese Funktion wird durch die vorherige Funktion aufgerufen. 
Anhand dieser Funktion wird jeder Perspektive, die mittels Vorlagen-Editor ausgewählt wurde, die resizable-Funktion hinzugefügt. Die Parameter der resizable-Funktion beinhalten dabei an welchen Ränder die Perspektive skaliert, wie weit die Perspektive vergrößert sowie verkleinrt werden kann. Dabei werden den Perspektiven derausgewählten Vorlage auch die Perspektivenvideos sowie der Button der Ein-/ und Ausblenden einzelner Perspektiven hinzugefügt.
*/

function appendResizeDiv(param1,param2,param3,param4,param5){
    $(".textPosition").hide();
    if(param1== "view4"){
        param2.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390 
        });
        param3.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390 
        });
        param2.prepend(appendBtn);
        param3.prepend(appendBtn);
        param2.find("p").hide();
        param2.append(appendVideo);
        param3.find("p").hide();
        param3.append(appendVideo);
        $(".video1").each(function(){
            this.currentTime = 0;
            this.pause();
        });
        $(".ion-minus").click(function(){
            closeDiv(this);
        });
        return;
    }
    if(param1 == "view5"){
        param2.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        param3.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        param4.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        param5.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        param2.prepend(appendBtn);
        param3.prepend(appendBtn);
        param4.prepend(appendBtn);
        param5.prepend(appendBtn);
        param2.find("p").hide();
        param2.append(appendVideo);
        param3.find("p").hide();
        param3.append(appendVideo);
        param4.find("p").hide();
        param4.append(appendVideo);
        param5.find("p").hide();
        param5.append(appendVideo);
        $(".video1").each(function(){
            this.currentTime = 0;
            this.pause();
        });
        $(".ion-minus").click(function(){
            closeDiv(this);
        });
        return;
       }
    if(param1== "view7"){
        param2.resizable({
            handles : "n, e, s, w",
            disabled: false,
            minHeight: 95,
            minWidth: 180,
            maxWidth: 1030,
            maxHeight: 390
        });
        param2.prepend(appendBtn);
        param2.find("p").hide();
        param2.append(appendVideo);
        $(".video1").each(function(){
            this.currentTime = 0;
            this.pause();
        });
        $(".ion-minus").click(function(){
            closeDiv(this);
        });
        return;
       }
    param2.resizable({
        handles : "n, e, s, w",
        disabled: false,
        minHeight: 95,
        minWidth: 180,
        maxWidth: 1030,
        maxHeight: 390
    });
    param3.resizable({
        handles : "n, e, s, w",
        disabled: false,
        minHeight: 95,
        minWidth: 180,
        maxWidth: 1030,
        maxHeight: 390
    });
    param4.resizable({
        handles : "n, e, s, w",
        disabled: false,
        minHeight: 95,
        minWidth: 180,
        maxWidth: 1030,
        maxHeight: 390
    });
    param2.prepend(appendBtn);
    param3.prepend(appendBtn);
    param4.prepend(appendBtn);
    param2.find("p").hide();
    param2.append(appendVideo);
    param3.find("p").hide();
    param3.append(appendVideo);
    param4.find("p").hide();
    param4.append(appendVideo);
    $(".video1").each(function(){
            this.currentTime = 0;
            this.pause();
        });
    $(".ion-minus").click(function(){
        closeDiv(this);
    });
}

/*
Bei jeder neuen Auswahl aus dem Vorlagen-Editor wird diese Funktion aufgerufen. Diese Funktion soll die Perspektiven erstmal wieder zurück zu ihrer Default-Position bringen. Ohne die Verwendung dieser Funktion, kommt es bei mehrmaliger Verwendung des Vorlagen-Editor zu unerklärlichen VErhalten.
*/

function setDefaultView(){
    $(".perspectives").each(function(){
        $(this).css({
            width: "180px",
            height: "95px",
            margin: "4%"
        });
        if($(this).children().first().is("button")){
            $(this).children().first().remove();
            $(this).resizable({
                handles : "",
                disabled: true
            });
        $(this).find("p").show();
        if($(this).find(".video1").length){
            $(this).find(".video1").remove(".video1");
           }
        }
    });
    checkEmptyDropZone();
    $("#pp1").css({
        top: top1,
        left: left1
    });
    $("#pp2").css({
        top: top2,
        left: left2
    });
    $("#pp3").css({
        top: top3,
        left: left3
    });
    $("#pp4").css({
        top: top4,
        left: left4
    });
    $("#pp5").css({
        top: top5,
        left: left5
    });
}

/*
Diese Funktion bringt die Perspektiven wieder zurück zu ihrer DEfault-Position.
*/

function closeDiv(param){
    var topx, leftx;
    var parentDiv = $(param).closest("div");
    switch (parentDiv.attr("id").substr(2)){
        case "1":
            topx = top1;
            leftx = left1;
            break;
        case "2":
            topx = top2;
            leftx = left2;
            break;
        case "3":
            topx = top3;
            leftx = left3;
            break;
        case "4":
            topx = top4;
            leftx = left4;
            break;
        case "5":
            topx = top5;
            leftx = left5;
            break;
    }
    $(param).remove();
    parentDiv.find("p").show();
    if(parentDiv.find(".video1").length){
        parentDiv.find(".video1").remove(".video1");
    }

    parentDiv.resizable({
        handles: "",
        disabled: true
    });
    $(parentDiv).animate({
        top: topx ,
        left: leftx,
        width: "180px",
        height: "95px",
        margin: "4%"

    })  ;
    checkEmptyDropZone();
    if($(downButton).hasClass("glyphicon-chevron-up")){
        parentDiv.css("display", "none");
        parentDiv.css("visibility", "hidden");
       }
}

/*
mit playPause-Funktion können die PErspektiven mittels eines Klickens auf der entsprechenden Perspektive im Hauptbereich wiedergegeben sowie pausiert werden. Diese Funktion wird nur bei Perspektiven im Hauptbereich, also aktiven Perspektiven, aufgrufen.
*/

function playPause(){
    var myVideos = document.getElementsByClassName("video1");

    for(var i=0; i < myVideos.length; i++){
        var myVideo = myVideos[i];
        myVideo.paused? myVideo.play(): myVideo.pause();
    }
}