
var svg = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 600);




var shapes = {
	initialX : ''
	initialY : '',
	interX : '',
	interY : '',
	line: ' ',

	line : function(x1,y1,x2,y2){

		var t = this

		t.initialX = x1
		t.initialY = y1
		line = svg.append("line").attr("x1",t.initialX )
		.attr("y1",t.initialY)
		.attr("x2",t.initialX)
		.attr("y2",t.initialY)
		return line;


	},

	lineUpdate: function(x2,y2){

		line.attr("x2",x2)
		.attr("y2",y2)

	}


}



	var button = d3.selectAll('button')
    .on("click", function(){

      console.log(d3.event.currentTarget.id);
      objectDraw = d3.event.currentTarget.id;

    });

      
      shapes = new shape.objectDraw.(initialX,initialY,initialX,initialY)
      var newfunction = objectDraw + "Update"
      shapes.newfunction


    svg.on("mousedown", function(){
      initialX = d3.event.x;
      initialY = d3.event.y;
    });
    svg.on("mousemove", function(){
    	interX = d3.event.x;
    	interY = d3.evetn.y;


    });
    svg.on("mouseup", function(){
      drawObj.isDown = false;
      drawObj.currentPath.attr("class","oldPath");
      drawObj.dataPoints = [];
      drawObj.currentPath = null;
      if (++drawObj.color > 19) {
        drawObj.color = 0;
      }
    })
