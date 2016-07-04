  <script>
    var svg = d3.select('body')
      .append('svg')
      .attr('width', 500)
      .attr('height', 600);
      
    var color = d3.scale.category20();
    
    var line = d3.svg.line()
        .interpolate("basis");
    
    var drawObj = {
      isDown: false,
      dataPoints: [],
      currentPath: null,
      color: 0
    }

    var objectDraw = "rectangle";
    
    var button = d3.selectAll('button')
        .on("click", function(){

          console.log(d3.event.currentTarget.id);
          objectDraw = d3.event.currentTarget.id;

        });



    svg.on("mousedown", function(){
      drawObj.isDown = true;
      
    });
    svg.on("mousemove", function(){
      if (drawObj.isDown){
        drawObj.dataPoints.push(
          [d3.event.x, d3.event.y]
        );
        if (!drawObj.currentPath){
          drawObj.currentPath = svg.append("path")
            .attr("class","currentPath")
            .style("stroke-width", 1)
            .style("stroke",color(drawObj.color))
            .style("fill", "none");
        }
        drawObj.currentPath
          .datum(drawObj.dataPoints)
          .attr("d", line);
      }
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
  </script>
