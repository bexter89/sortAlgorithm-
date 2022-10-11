// var productsVersions = [
//   "2022.Q3",
//   "2022.Q2",
//   "2022.Q1",
//   "2020-Q2",
//   "2.latest",
//   "2021.Q4",
//   "2021.Q3",
//   "2020.q1",
//   "2020-Q4",
//   "2021.Q1",
//   "2019-12",
//   "2021.Q2",
//   "2020-Q3",
//   "2019-07",
//   "2019-04",
// ]

var productsVersions = [ "5","6","6.3","6.2","6.1","7","4.3","6.0","4.2","6.4","7.0","7.2","10","7.1","7.4","7.3","8","6.2.1","7.6","9","7.7","7.5","7.10","7.11","3","7.9","4","7.8","3.1", "2", "3.2", "3.3", "6.5", "4.1", "2.1", "11", "7.12", "7.13", "6.6", "4.4","13","4.0","14", "12", "15", "4.5", "4.7", "4.6", "8.0", "1.0", "7.0-TP","16.1","2.2","16.2","4.10","4.9","4.11","5.6","5.7","3.4","4.8","17.0","1","17.0-Beta", "16.0", "3.5", "2.0", "2017", "3.0", "5.2", "5.0", "2021.Q3", "5.8", "2020.Q4", "3.9", "2.3", "5.3", "5.5", "5.4", "17", "5.1.1", "3.10",
"3.7", "2022","2.11", "3.6", "16", "3.11", "2021.Q1", "2022.Q3", "2.5", "5.0.0", "18", "2.4", "1.7", "7.4-Beta", "1.1", "6.2.2", "2.7", "8.3",
]

// var productsVersions = ["2.2","2.3","2.1","2.0","2.11","2.9","2.12","2.10","2.7","2.8","2.6","2-saas","2.5","2.4"]

console.log('original: ', productsVersions)
// sort versions
var versionStorage = {}
var latestTag = undefined;

//sorting helper function
var storeAndSortByNums = function (versionString) {

// if there is a 'latest' version, put it the top of the list!
if (versionString.includes('latest')) {
  latestTag = versionString;
  versionString = '100000.100000';
}

  //currently this can handle a sort with up to 3 sort fields
  var fieldCount = 1;
  versionString.replace(/\d+/g,function (num) {
    // specific case only for versions with 'latest' in the tag
    if (num == 100000) {
      versionStorage[latestTag] = {sortField1: num ,sortField2: num }
    } else {      
      if (!versionStorage[versionString]) {
        // instantiate the version in the object,
        // give it a value for second num too, to help sort. 
        // can/might be reassigned in next step
        versionStorage[versionString] = {sortField1: num, sortField2: '100' }
      } else {
      fieldCount = fieldCount + 1;
      if (fieldCount == 3) {
        console.log('*** three! ****')
      }
      var fieldObject = {
        ['sortField' + fieldCount]: num 
      }
      versionStorage[versionString] = Object.assign(versionStorage[versionString], fieldObject)    
      }
    }
  });
};

// make storage obj into array, sort it, return it
var parseStorage = function () {   
  var sortableVersions = [];
  for (var key in versionStorage) {
    if (key === '100000.100000') {
      sortableVersions.push([latestTag, {sortField1: '100000', sortField2: '100000' }])
    } else {
    sortableVersions.push([key, versionStorage[key]]);
    }
  };
  console.log('versions arr: ', sortableVersions)
  
  // custom sort function
  sortableVersions.sort(function(a, b) {
    // if the first field is the same, skip it
    if (a[1].sortField1 === b[1].sortField1) {
      //we'll also look if minor version is same
      if (a[1].sortField2 === b[1].sortField2) {
        return b[1].sortField3 - a[1].sortField3;
      }
      // if not just, sort by the second field
      return b[1].sortField2 - a[1].sortField2;
    } else { // if sort field 1 is not the same
      // check if the the second field is the same
      if (a[1].sortField2 === b[1].sortField2) {
        return b[1].sortField3 - a[1].sortField3;
      } else {
      return b[1].sortField1 - a[1].sortField1
      }
    }
  })
  // return array of sorted strings
  return sortableVersions.map(function (item) {return item[0]});
};

productsVersions.forEach(function(item){
  storeAndSortByNums(item)
});

productsVersions = parseStorage(); 

console.log('sorted: ', productsVersions)



// //--------------------- Old Algo -------------------//
// console.log('original: ', productsVersions)

// productsVersions = productsVersions.map( function (a) { return a.replace(/\d+/g, function (n) { return +n+100000 } )}).sort().map( function (a) { return a.replace(/\d+/g, function (n) { return +n-100000 } )}).reverse();

// console.log('sorted', productsVersions)