// Original: https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_015_FractalTreeArray/P5
// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

// Modified by Imran Manzoor

let tree = [];
let leaves = [];

let count = 0;
let myBehaviour = 'uniform';

function setup() {
    let width = screen.width;
    let height = screen.height;
    createCanvas(width, height);

    button_1 = createButton('Uniform');
    button_1.position(10, 25);
    button_1.id('uniform');
    button_1.class('btn btn-primary');
    button_1.mousePressed(changeBehaviour);

    button_2 = createButton('Random angle');
    button_2.position(10, button_1.y + 50);
    button_2.id('r_angle');
    button_2.class('btn btn-primary');
    button_2.mousePressed(changeBehaviour);

    button_3 = createButton('Random length');
    button_3.position(10, button_2.y + 50);
    button_3.id('r_length');
    button_3.class('btn btn-primary');
    button_3.mousePressed(changeBehaviour);

    button_4 = createButton('Random angle and length');
    button_4.position(10, button_3.y + 50);
    button_4.id('r_angle_length');
    button_4.class('btn btn-primary');
    button_4.mousePressed(changeBehaviour);

    let a = createVector(width / 2, height - (height / 4));
    let b = createVector(width / 2, height - (height / 2));
    let root = new Branch(a, b, 5, 255, 60, 60);
    tree[0] = root;
    frameRate(1);
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
}

function changeBehaviour() {
    tree = [];
    leaves = [];
    count = 0;
    let a = createVector(width / 2, height - (height / 4));
    let b = createVector(width / 2, height - (height / 2));
    let root = new Branch(a, b, 5, 255, 60, 60);
    tree[0] = root;
    frameRate(1);
    if(this.elt.id === 'uniform') {
        myBehaviour = 'uniform';
    }
    else if(this.elt.id === 'r_angle') {
        myBehaviour = 'random_angle'
    }
    else if(this.elt.id === 'r_length') {
        myBehaviour = 'random_length'
    }
    else if(this.elt.id === 'r_angle_length') {
        myBehaviour = 'random_length_and_angle'
    }
}

function build_tree(behaviour) {
  console.log(behaviour, count)
  if(count === 6) {
      return;
  }
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {

        if (behaviour === 'uniform') {
            tree.push(tree[i].branch_out(PI / 3, 0.67));
            tree.push(tree[i].branch_out(-PI / 3, 0.67));
            tree.push(tree[i].branch_out(PI / 6, 0.67));
            tree.push(tree[i].branch_out(-PI / 6, 0.67));
        }

        else if (behaviour === 'random_length'){
            tree.push(tree[i].branch_out(PI / 3, random([0.67, 0.67, 0.50, 0.75])));
            tree.push(tree[i].branch_out(-PI / 3, random([0.67, 0.67, 0.50, 0.75])));
            tree.push(tree[i].branch_out(PI / 6, random([0.67, 0.67, 0.50, 0.75])));
            tree.push(tree[i].branch_out(-PI / 6, random([0.67, 0.67, 0.50, 0.75])));
        }

        else if (behaviour === 'random_angle'){
            tree.push(tree[i].branch_out(PI / random(2,8), 0.67));
            tree.push(tree[i].branch_out(-PI / random(2,8), 0.67));
            tree.push(tree[i].branch_out(PI / random(2,8), 0.67));
            tree.push(tree[i].branch_out(-PI / random(2,8), 0.67));
        }

        else if (behaviour === 'random_length_and_angle'){
              tree.push(tree[i].branch_out(PI / random(2,8), random([0.67, 0.67, 0.50, 0.75])));
              tree.push(tree[i].branch_out(-PI / random(2,8), random([0.67, 0.67, 0.50, 0.75])));
              tree.push(tree[i].branch_out(PI / random(2,8), random([0.67, 0.67, 0.50, 0.75])));
              tree.push(tree[i].branch_out(-PI / random(2,8), random([0.67, 0.67, 0.50, 0.75])));
        }

    }
    tree[i].finished = true;
  }
  count++;

  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished && random(1,10) > 7) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(51);
  build_tree(myBehaviour);
  console.log(count)
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    //tree[i].jitter();
  }

  if(count === 6) {
      frameRate(60);
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(16, 181, 173, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 4, 4);
    if(i % 2 == 0 && leaves[i].y <= height - (height / 4)) {
        leaves[i].y += 1;
    }
  }

}