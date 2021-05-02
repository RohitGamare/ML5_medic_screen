  
let neuralNetwork;
let submitButton;

function setup() {
  noCanvas();

  let nnOptions = {
    dataUrl: 'data/healtdata.csv',
    inputs: ['height','gender', 'age', 'weight'],
    outputs: ['BMICat'],
    task: 'classification',
    debug: true
  };

  neuralNetwork = ml5.neuralNetwork(nnOptions, modelReady)
  submitButton = select('#submit');
  submitButton.mousePressed(classify);
  submitButton.hide();
}

function modelReady() {
  neuralNetwork.normalizeData();
  neuralNetwork.train({ epochs: 10 }, whileTraining, finishedTraining);
}

function whileTraining(epoch, logs) {
  console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(2)}`);
}

function finishedTraining() {
  console.log('done!');
  submitButton.show();
  classify();
}

// TODO: normalize and encode values going into predict?
function classify() {
  let age = parseInt(select('#age').value());
  let fare = parseInt(select('#weight').value());
  let fare_class = select('#height').value();
  let sex = select('#gender').value();

  // let inputs = {
  //   age: age,
  //   fare: fare,
  //   fare_class: fare_class,
  //   sex: sex
  // };

  let inputs = [height, gender, age, weight];
  neuralNetwork.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    select('#result').html(`Health Status: ${results[0].label}`);
  }
}