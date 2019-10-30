function Branch(begin, end, weight, red, green, blue) {
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.weight = weight;
  this.red = red;
  this.green = green;
  this.blue = blue;

  this.show = function() {
    stroke(this.red, this.green, this.blue);
    strokeWeight(this.weight);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  this.branch_out = function(angle, length_multiplier) {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(length_multiplier);
    // dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var branch = new Branch(this.end, newEnd, this.weight / 1.6, this.red, this.green + 20 , this.blue + 20);
    return branch;
  }

}