const assert = require('chai').assert;
const seasonalPrediction = require('../seasonal-prediction');
const fs = require('fs');
const path = require('path')

describe('seasonal-prediction',function(){

  const threePointSet = [ [2017,'all year', 10], [2016, 'all year', 9], [2015, 'all year', 2] ];
  const linearGrowth = [
    [2014,'Q1', 10],
    [2014,'Q2', 11],
    [2014,'Q3', 12],
    [2014,'Q4', 13],
    [2015,'Q1', 14],
    [2015,'Q2', 15],
    [2015,'Q3', 16],
    [2015,'Q4', 17],
    [2016,'Q1', 18],
    [2016,'Q2', 19],
    [2016,'Q3', 20],
    [2016,'Q4', 21],
    [2017,'Q1', 22],
    [2017,'Q2', 23],
    [2017,'Q3', 24],
    [2017,'Q4', 25],
];

  const linearYearlyGrowthWithSeasonal = [
    [2014,'Q1', 10],
    [2014,'Q2', 9],
    [2014,'Q3', 11],
    [2014,'Q4', 10],
    [2015,'Q1', 20],
    [2015,'Q2', 20],
    [2015,'Q3', 18],
    [2015,'Q4', 22],
    [2016,'Q1', 30],
    [2016,'Q2', 27],
    [2016,'Q3', 33],
    [2016,'Q4', 30],
];

  const twoPointSet = [ [2017,'all year', 10], [2016, 'all year', 9] ];
  itIs(twoPointSet,2018,'all year', 11,'exact constraint');
  itIs(threePointSet,2018,'all year', 15, 'over constrained');
  itIs(linearGrowth,2018,'Q1', 24.97, 'linearGrowth');
  itIs(linearYearlyGrowthWithSeasonal,2017,'Q1', 40, 'linear Growth with seasonal and on trend');
  itIs(linearYearlyGrowthWithSeasonal,2017,'Q2', 37.333, 'linear Growth with seasonal and on belown 10%');

  const cdc = fs.readFileSync(path.join(__dirname,'../data/cdc-data.csv'),'utf8')
    .split('\n')
    .map(x => x.split(',').map(y=> y.trim()))
    .map(x => [+x[0], x[1], +x[2]])

  itIs(cdc,2017,'45', 910866.998, 'cdc!');



  function itIs(data,year,season,expected,name) {
    it(name, function(){
      let model = seasonalPrediction.learn(data);
      //console.log(model)
      let actual = seasonalPrediction.predict([year,season],model);
      assert.closeTo(actual,expected,0.001);
    })
  }
})
