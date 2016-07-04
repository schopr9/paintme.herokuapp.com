
/**
 * Date: 2016-06-25
 * @author Saurabh Chopra
 * @updated 2016-07-03
 */
/*This is a paint program, using the D3.js and it can perform multiple function*/


// To do - to handle negative coordinates of x
// handle undo and redo
//select elements on d3 svg

// objects that we can draw, so that we can update these objects on three main function
//mousedown
//mousemove
//mouseup

var line;

var rectangle;

var ellipse;


var drawObj = {
  isDown: false,
  dataPoints: [],
  currentPath: null,
  color: 0
};


var scribble= d3.svg.line()
        .interpolate("basis");

var color = d3.scale.category20();

/* To select the object from the buttons    */
var objectDraw = "rectangle";

var button = d3.selectAll('button')
    .on("click", function(){

      console.log(d3.event.currentTarget.id);
      objectDraw = d3.event.currentTarget.id;

      if (objectDraw == 'undo') hidelast();
      if (objectDraw == 'save') saveImage();

    });


// TO make x,y coordinate global so that we can update objects
var iniitialX, initialY, interX, interY, finalX, finalY;


// to append the svg box to the html
var vis = d3.select("#svg").append("svg") 
    .attr("width", 600)
    .attr("height", 400)
    .on("mousedown", mousedown)
    .on("mouseup", mouseup)    
    .on("click", click);


function mousedown() {
    var m = d3.mouse(this);
    initialY = m[1];
    iniitialX = m[0];
    interX = m[0];
    interY = m[1];
    drawobject();
    if (objectDraw == "scribble"){drawObj.isDown = true;}
    //line = vis.append("line")
    //    .attr("x1", m[0])
    //    .attr("y1", m[1])
    //    .attr("x2", m[0])
    //    .attr("y2", m[1]);
    
    vis.on("mousemove", mousemove);
}

function mousemove() {
    var m = d3.mouse(this);
    interX = m[0];
    interY = m[1];
    if (drawObj.isDown){
    drawObj.dataPoints.push(
      [d3.event.x, d3.event.y]
    )};

    updateObject();
    //drawobject();
    //line.attr("x2", m[0])
    //    .attr("y2", m[1]);
}

function mouseup() {
    vis.on("mousemove", null);
      drawObj.isDown = false;
      drawObj.currentPath.attr("class","oldPath");
      drawObj.dataPoints = [];
      drawObj.currentPath = null;
   if (++drawObj.color > 19) {
        drawObj.color = 0;
      }

}


function drawobject(){


    switch(objectDraw){

        case 'line':
            appendLine();
            break;

        case 'rectangle':
            appendRectangle();
            break;
        case 'ellipse':
            appendEllipse();
            break;
        case 'undo':
            hidelast();
            break;        
        case 'save':
            saveImage();
            break;        
        default:
            appendScribble();
            break;
            

    }

}


function appendLine(){


        line = vis.append("line")        
        .attr("x1", iniitialX)
        .attr("y1", initialY)
        .attr("x2", interX)
        .attr("y2", interY)
        .style("cursor", "pointer")
        .call(drag);

}



function appendRectangle(){


        rectangle = vis.append("rect")
        .attr("x", iniitialX)
        .attr("y", initialY)
        .attr("width", 10)
        .attr("height", 20)
        .style("cursor", "pointer")
        .call(drag);

}

function appendScribble() {
    drawObj.isDown = true;
    // body...
}

function appendEllipse(){


    ellipse = vis.append("ellipse")
                .attr("cx", iniitialX)
                .attr("cy",initialY)
                .attr("rx",1)
                .attr("ry",1)
                .style("cursor", "pointer")
                .call(drag);
}

function updateObject(){

    switch(objectDraw){

        case 'line':
            line.attr("x2", interX)
                .attr("y2", interY);
            break;

        case 'rectangle':
            rectangle.attr("width", interX - iniitialX)
                .attr("height", interY - initialY)
            break;

        case 'scribble':
            if (!drawObj.currentPath){
            drawObj.currentPath = vis.append("path")
            .attr("class","currentPath")
            .style("stroke-width", 1)
            .style("stroke",color(drawObj.color))
            .style("fill", "none")    
            }        
            drawObj.currentPath
            .datum(drawObj.dataPoints)
            .attr("d", scribble);
            break;
         case 'ellipse':
            ellipse.attr("rx",interX - iniitialX)
                    .attr("ry",Math.abs(interY - initialY));
            break;        

        default:
            appendLine();
            break;
            

    }



}

function click(){
  // Ignore the click event if it was suppressed
  if (d3.event.defaultPrevented) return;

  // Extract the click location\    
  var point = d3.mouse(this)
  , p = {x: point[0], y: point[1] };

  // Append a new point
 /*
  vis.append("circle")
      .attr("transform", "translate(" + p.x + "," + p.y + ")")
      .attr("r", "5")
      .attr("class", "dot")
      .style("cursor", "pointer")
      .call(drag);
  */
  
  
}

function moveline(){

  var item = d3.select(this);    
  item.on("drag", dragmove);
  
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);


function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}


var counter;
var eleArray = [];

function hidelast(){

  var y = d3.select("svg").selectAll("g");

  counter = y[0].parentNode.childNodes;
  
  var element = y[0].parentNode.childNodes[counter.length -1];

  eleArray.push(element);

  element.remove();
  console.log(eleArray);


}

function showlast(){

  $("#svg").append(eleArray[eleArray.length - 1]);




}

function saveImage(){

    var svg = document.querySelector( "svg" );
var svgData = new XMLSerializer().serializeToString( svg );

var canvas = document.createElement( "canvas" );
    var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
var ctx = canvas.getContext( "2d" );

var img = document.createElement( "img" );
img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );


    ctx.drawImage( img, 0, 0 );
    
    // Now is done
    var canvasdata =  canvas.toDataURL( "image/png" ) ;

  var a = document.createElement("a");
  a.download = "export_"+Date.now()+".png";
  a.href = canvasdata; 
  document.body.appendChild(a);
  a.click();
    
    };





