//#########################################################################
//DECLARE FUNCTIONS

var getBounds = function(target){
    var t = target;
    var w = t.bounds.width;
    var h = t.bounds.height;
    var wMin = t.position.x - (w/2);
    var wMax = t.position.x + (w/2);
    var hMin = t.position.y - (h/2);
    var hMax = t.position.y + (h/2);

    return {
        xMin: wMin,
        xMax: wMax,
        yMin: hMin,
        yMax: hMax
    };
}

var getDistance = function(a, b){
    var dist = a - b;
    var distLength = dist.length;
    return distLength;
}

var getRadius = function(path) {
    //find the radius without the stroke
    return path.bounds.width / 2 + path.strokeWidth / 2;
}

var setRadius = function(path, radius) {
    // calculate new radius without stroke
    var newRadius = radius - path.strokeWidth / 2;
    // calculate old radius without stroke 
    var oldRadius = path.bounds.width / 2;
    path.scale(newRadius / oldRadius);
}

var setRadiusByDistance = function(a, b, sU, sV, hR){
    this.a = a;     //object a
    this.b = b;     //object b is the scale object
    this.hR = hR;   //hit radius
    this.sU = sU;   //scale of b when a is far
    this.sV = sV;   //scale of b when a is close
    this.mag = this.hR/this.sV-sU;

    var myDist = getDistance(this.a, this.b.position);
    var invertDistRange;

    if (this.sU < this.sV){
        invertDistRange = ((myDist*-1)+(this.hR + this.sU))/(this.hR/this.sV);

        if(myDist < this.hR && invertDistRange > this.sU){
            setRadius(this.b, invertDistRange);
        }else{
            setRadius(this.b, this.sU);
        }
    }else{
        invertDistRange = myDist/(this.hR/this.sU);
        if(myDist < this.sV || invertDistRange < this.sV){
            setRadius(this.b, this.sV);
        }else if(myDist > this.hR){
            setRadius(this.b, this.sU);
        }else{
            setRadius(this.b, invertDistRange);
        }
    }
}

var setOpacityByDistance = function(a, b, oU, oV, hR){
    this.a = a;     //object a
    this.b = b;     //object b is the scale object
    this.hR = hR;   //hit radius
    this.oU = oU;   //scale of b when a is far
    this.oV = oV;   //scale of b when a is close
    this.mag = this.hR/this.oV-oU;

    var myDist = getDistance(this.a, this.b.position);
    var invertDistRange;

    if (this.oU < this.oV){
        invertDistRange = ((myDist*-1)+(this.hR + this.oU))/(this.hR/this.oV);

        if(myDist < this.hR && invertDistRange > this.oU){
            //setRadius(this.b, invertDistRange);
            this.b.opacity = invertDistRange;
        }else{
            //setRadius(this.b, this.oU);
            this.b.opacity = oU;
        }
    }else{
        invertDistRange = myDist/(this.hR/this.oU);
        if(myDist < this.oV || invertDistRange < this.oV){
            //setRadius(this.b, this.oV);
        }else if(myDist > this.hR){
            //setRadius(this.b, this.oU);
        }else{
            //setRadius(this.b, invertDistRange);
        }
    }
}


//#########################################################################
//CREATE OBJECTS

//create node object
var node = new Path.Circle({
    center: [100,100],
    radius: 10,
    fillColor: 'white',

});

    //convert to symbol and create group container
    var Node = new Symbol(node);
    var nodeGroup = new Group();
    //console.log(node);

for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
        var offset = 50;
        var x = offset+i*25;
        var y = offset+j*25;

        var nodes = Node.place(new Point(x,y));
        nodeGroup.addChild(nodes);

    }
}

console.log(nodeGroup.children[0]);


//#########################################################################
//CREATE EVENT HANDLERS

/*
function onFrame(event){
}
*/
//var dest = new Point();

for(var i=0;i<nodeGroup.children.length;i++){
        var object = nodeGroup.children[i];
        object.opacity = .125;

    }

function onMouseMove(event){

    for(var i=0;i<nodeGroup.children.length;i++){
        var target = nodeGroup.children[i];
        setOpacityByDistance(event.middlePoint, target, .125, 1, 50);

    }

    //setRadiusByDistance(event.middlePoint, Node1, 5, 30, 100);
    //setRadiusByDistance(event.middlePoint, Node1, 30, 5, 200);
}
