/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-alert */

/* eslint-env browser, true */

/* Created by: https://github.com/sam-g99

This program estimates how many calories a person would burn based on their weight
and what activity they do. The activities supported are walking, running, and jumping jacks.
Also the program can generate routines based on simple user preferences such as a how many
calories a user would like to burn (Target Burn) and which activity they would like to do the most(high, medium, low). */

// Objects for user information and activity data
const user = {
  weight: 0,
  metric: 'lb',
  targetBurn: 1000,
};

const activities = [
  {
    activity: 'walking',
    metric: 'mile',
    cal: 0.5555555555555556,
    amount: 0,
    burn: 0,
  },
  {
    activity: 'running',
    metric: 'mile',
    cal: 0.7571428571428572,
    amount: 0,
    burn: 0,

  },
  {
    activity: 'jumping jacks',
    metric: 'minute',
    cal: 0.034,
    amount: 0,
    burn: 0,
  },
];
const [walking, running, jumpingjacks] = activities;

// Variables dealing with weight
let weightMetric = 'lb';

// All functions dealing with weight input
const kiloToPounds = x => x / 0.453592;

const updateUserWeight = (weight) => {
  let pounds;
  if (weightMetric === 'lb') {
    pounds = weight;
  } else {
    pounds = kiloToPounds(parseInt(weight, 10));
  }
  user.weight = pounds;
};
// obvious stuff

// function for animation after user is done putting in their weight
const weightEnteredAnimation = () => {
  document.getElementById('weight').style.display = 'none';
};
const weightDisplay = document.getElementById('displayWeight');
const displayWeight = (w, m) => {
  weightDisplay.innerHTML = `<div class="user-weight-title">Current Weight</div> <div class="weight-number" id="userWeightDisplayed"> ${w}${m}</div>`;
};
// if (option !== 'routine') {
//   content.innerHTML = routineHtml;
//   document.getElementById('generateRoutine').addEventListener('click', () => {
//     executeRoutine();
//   });
//   option = 'routine';
//   splitPriority();
//   document.getElementById('splitPriority').addEventListener('click', () => splitPriority());
//   document.getElementById(`${removeSpace(activityhigh)}_high`).style.backgroundColor = priorityColor;
//   document.getElementById(`${removeSpace(activitymed)}_med`).style.backgroundColor = priorityColor;
//   document.getElementById(`${removeSpace(activitylow)}_low`).style.backgroundColor = priorityColor;
//   activities.forEach(({ activity }) => {
//     prioritiesArr.forEach((priority) => {
//       const button = document.getElementById(`${removeSpace(activity)}_${priority}`);
//       button.addEventListener(('click'), (event) => {
//         changingPriority(activity, priority, event.target.id);
//       });
//     });
//   });
// }

// Setting up event listener for input that gets the users weight
const weightInput = document.getElementById('weight-input');
weightInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    if (event.target.value < 10) {
      return;
    }
    const pounds = parseInt(event.target.value, 10); // Getting the weight the user inputed
    updateUserWeight(pounds);
    weightEnteredAnimation();
    displayWeight(pounds, weightMetric);
    weightInput.readOnly = true;
  }
});


const content = document.getElementById('content');
const background = document.getElementById('background');

const weightInputMetric = document.getElementById('weightInputMetric');
const displayTotalBurn = document.getElementById('totalBurn');


const totalBurnHTML = `  <div class="total-calories-burned">
Total Calories Burned
<div class="calorie-counter" id="totalBurnRes">0</div>
</div>`;

let prevWeight = 0;
let option = '';
let currentSpeed = 6;
let activityMetric = 'mi';
// MAIN FUNCTIONS

const removeNum = str => str.replace(/[0-9]/g, '');
const removeChar = str => str.replace(/\D/g, '');
const removeSpace = str => str.replace(/\s/g, '');

const convertKmToMiles = x => x / 1.609344;
const changeInnerHtml = (id, change) => { document.getElementById(id).innerHTML = ` ${change}`; };
const calculateBurn = ({ cal, amount }, { weight }) => parseInt(cal * weight * amount, 10);
// Generated inputs
const speedOptions = () => {
  for (let i = 1; i < 28; i += 1) {
    const speedContainer = document.getElementById('speedOptions');
    speedContainer.innerHTML += `<div class="speed-option" id="speedOption" onclick="changeSpeed(${i})">${i} mph</div>`;
  }
};

const optionsToggle = () => {
  const options = document.getElementById('speedOptions');
  document.addEventListener('click', (e) => {
    if (e.target.id !== 'speedOption' && options.classList.contains('speed-options-open')) {
      if (e.target.id !== 'speedValue') {
        options.classList.remove('speed-options-open');
      }
    }
  });
  if (!options.classList.contains('speed-options-open')) {
    options.classList.add('speed-options-open');
  } else {
    options.classList.remove('speed-options-open');
  }
};

// update values based on distance metric mi/km
let totalBurnDom = ''; // waiting for total burn element
const updateTotalBurn = () => {
  totalBurnDom.innerHTML = walking.burn + running.burn + jumpingjacks.burn;
};
// This updates the values after a user changes the metric for distance mi/km
const updateValues = (a, m) => {
  const value = parseInt(document.getElementById(`${a.activity}-input`).value, 10);
  const distanceValue = (m === 'km') ? convertKmToMiles(value) : value;
  activityMetric = m;
  document.getElementById(`${a.activity}InputMetric`).innerHTML = m;
  if (distanceValue > 0) {
    a.amount = distanceValue; // used to save previously entered calculator input data
    a.burn = calculateBurn(a, user); // this is used to calculate total burn
    changeInnerHtml(`calorie${a.activity}`, calculateBurn(a, user));
    updateTotalBurn();
  }
};
const toggleDistanceMetric = () => {
  const metric = document.getElementById('walkingInputMetric').innerText; // getting current metric via div text
  const newMetric = (metric === 'mi') ? 'km' : 'mi';
  const activityChange = [walking, running];
  activityChange.forEach((x) => { updateValues(x, newMetric); });
};


const constructActivity = ({ activity }) => {
  const activityNs = removeSpace(activity);
  const walkingString = `<div class="activity-card-container"> <div class="input-items activity-input"><div class="input-background"></div> <input type="text" onkeypress="return numOnly(event)" class="input-info" autocomplete="off" maxlength="3" id="${activityNs}-input"><label id="${activityNs}Label">${activity}</label> <div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </div>`;
  const runningString = `<div class="activity-card-container"><div class="input-items activity-input"><div class="input-background"></div> <input type="text" onkeypress="return numOnly(event)" class="input-info" autocomplete="off" maxlength="3"  id="${activityNs}-input"/><label id="${activityNs}Label">${activity}</label><div class="speed-input" id="speedValue" onclick="optionsToggle()">6</div><div class="speed-options-container" id="speedOptions"></div><div class="mph">mph</div> <div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </div>`;
  const jumpingjackString = `<div class="activity-card-container"> <div class="input-items activity-input"><div class="input-background"></div> <input type="text" onkeypress="return numOnly(event)" class="input-info" autocomplete="off" maxlength="3" id="${activityNs}-input"><label id="${activityNs}Label">${activity}</label> <div class="input-metric" id="${activityNs}InputMetric"><p>min</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </div>`;
  let output;
  if (activity === 'running') {
    output = runningString;
  } else if (activity === 'walking') {
    output = walkingString;
  } else {
    output = jumpingjackString;
  }
  return output;
};
const addEventForCals = (activityData) => {
  const id = removeNum(activityData); // Stripping number to just get activity
  document.getElementById(`${id}-input`).addEventListener('keyup', (event) => {
    const num = removeChar(activityData); // getting number corresponding to activities object
    const distanceValue = (activityMetric === 'mi') ? event.target.value : convertKmToMiles(event.target.value);
    activities[num].amount = distanceValue;
    changeInnerHtml(`calorie${id}`, ` ${calculateBurn(activities[num], user)}`); // Updating Cal Values
    activities[num].burn = calculateBurn(activities[num], user);
    updateTotalBurn();
  });
};

const changeMetric = () => {
  const metricDisplay = document.getElementById('currentMetric');
  const metricDom = document.getElementById('weightDropdown');
  switch (weightMetric) {
    default:
      alert('Unknown error ;)');
      break;
    case 'lb':
      metricDisplay.innerHTML = 'lb';
      metricDom.innerHTML = 'kg';
      break;
    case 'kg':
      metricDisplay.innerHTML = 'kg';
      metricDom.innerHTML = 'lb';
      break;
  }
};
// LISTENER EVENT FUNCTIONS
const closeMetricDropdown = () => {
  const drop = document.getElementById('weightDropdown');
  const icon = document.getElementById('dropdown');
  const input = document.getElementById('weightInputMetric');
  drop.classList.remove('metric-options-open');
  drop.classList.add('metric-options-closed');
  icon.classList.add('dropdown-icon');
  icon.classList.remove('up-icon');
  setTimeout(() => { input.style.borderBottomRightRadius = '10px'; }, 200);
};
const dropdown = document.getElementById('weightDropdown');
dropdown.addEventListener('click', () => { weightMetric = dropdown.innerHTML; changeMetric(); closeMetricDropdown(); });
const weightMetricDropdownToggle = () => {
  const drop = document.getElementById('weightDropdown');
  const icon = document.getElementById('dropdown');
  const input = document.getElementById('weightInputMetric');
  if (drop.classList.contains('metric-options-closed')) {
    drop.classList.remove('metric-options-closed');
    drop.classList.add('metric-options-open');
    icon.classList.remove('dropdown-icon');
    icon.classList.add('up-icon');
    input.style.borderBottomRightRadius = 0;
  } else {
    drop.classList.remove('metric-options-open');
    drop.classList.add('metric-options-closed');
    icon.classList.add('dropdown-icon');
    icon.classList.remove('up-icon');
    setTimeout(() => { input.style.borderBottomRightRadius = '10px'; }, 200);
  }
};
document.getElementById('weightInputMetric').addEventListener('click', () => { weightMetricDropdownToggle(); });
const editWeight = () => {
  prevWeight = weightInput.value;
  weightInput.readOnly = false;
  weightInput.focus();
  weightInput.value = '';
  document.getElementById('weightInputMetric').innerHTML = '<p class="cancel" id="cancelButton">cancel</p>';
  document.getElementById('cancelButton').addEventListener('click', () => cancelEdit()); // Add Event For Edit Button
};
const cancelEdit = () => {
  changeInnerHtml('weightInputMetric', '<p class="edit-button" id="editButton">edit</p>');
  weightInput.value = prevWeight;
  weightInput.readOnly = true;
  // eslint-disable-next-line no-use-before-define
  document.getElementById('editButton').addEventListener('click', () => editWeight()); // Add Event For Edit Button
};
const updateRunBurn = () => {
  const speed = currentSpeed;
  running.cal = 0.1261904761904762; // amount of cals to add for each speed(mph) increase
  running.cal *= speed;
  document.getElementById('calorierunning').innerHTML = ` ${calculateBurn(running, user)}`;
  running.burn = calculateBurn(running, user);
  updateTotalBurn();
};

const changeSpeed = (x) => { currentSpeed = x; document.getElementById('speedValue').innerHTML = currentSpeed; updateRunBurn(); };
const addEventLabel = (x) => {
  const input = document.getElementById(`${x}-input`);
  input.addEventListener('focus', () => {
    const label = document.getElementById(`${x}Label`);
    console.log(window.innerWidth);
    if (window.innerWidth < 1001) {
      label.classList.add('focused-input-mobile');
    } else {
      label.classList.add('focused-input');
    }
  });
  input.addEventListener('focusout', () => {
    if (input.value === '') {
      const label = document.getElementById(`${x}Label`);
      label.classList.remove('focused-input');
      label.classList.remove('focused-input-mobile');
    }
  });
};
const toggleDistanceButton = '<div class="distance-metric" id="distanceBut"><div id="mi">mi</div><div id="km">km</div></div>';
// CALCULATOR OPTION LOGIC
const calculatorButtonEvent = () => {
  document.getElementById('calculator-button').addEventListener('click', () => {
    if (option === '') {
      document.getElementById('optionsContainer').classList.remove('option-not-chosen');
      document.getElementById('optionsContainer').classList.add('option-chosen');
    }
    if (option !== 'calc') {
      option = 'calc';
      let i = 0;
      document.getElementById('buttonContainer').innerHTML = toggleDistanceButton;
      document.getElementById('distanceBut').addEventListener('click', () => toggleDistanceMetric());
      activities.forEach((x) => {
        if (i === 0) {
          i += 1;
          content.innerHTML = constructActivity(x);
        } else {
          content.innerHTML += constructActivity(x);
        }
      });
      background.innerHTML = totalBurnHTML;
      totalBurnDom = document.getElementById('totalBurnRes');
      background.style.height = '50vh';
      speedOptions();
      ['walking0', 'running1', 'jumpingjacks2'].forEach((x) => { addEventForCals(x); });
      ['walking', 'running', 'jumpingjacks'].forEach((x) => { addEventLabel(x); });
    }
  });
};

// WeightAnimation
const inputGenerate = document.getElementById('inputGenerate');
const note = document.getElementById('note');

const decisionInfoHtml = `  
<p><span class="activity-text">Calculator</span> gives you the option to manually input the stats for the activities(walking, running, jumping jacks). <span class="activity-text">Routine</span> will let you generate a routine using those activities based on how many calories you would like to burn.</p>
`;
const optionsHtml = `  <div class="option-container option-not-chosen" id="optionsContainer">
<button id="calculator-button" class="unselectable">Calculator</button><button id="routine-button" class="unselectable">Routine</button>
</div>`;
// WEIGHT INPUT LOGIC

const priorityColor = 'rgb(144, 188, 255)';
const regColor = 'rgb(218, 218, 218)';


const convertableMetrcis = ['weight', 'mile'];


// ROUTINE GENERATOR LOGIC
const routineHtml = `<div class="main-priorty-container" id="mainPriorityContainer">
<div class="split-button" id="splitPriority">Split Evenly</div>
<div class="priority-container">
   <h2>Walking</h2>
   <div class="priority-button" id="walking_high">high</div>
   <div class="priority-button" id="walking_med">med</div>
   <div class="priority-button" id="walking_low">low</div>
</div>
   <div class="priority-container">
       <h2>Running</h2>
       <div class="priority-button" id="running_high">high</div>
       <div class="priority-button" id="running_med">med</div>
       <div class="priority-button" id="running_low">low</div>
   </div>
   <div class="priority-container" style="margin-right:0 !important;">
       <h2>Jumping Jacks</h2>
       <div class="priority-button" id="jumpingjacks_high">high</div>
       <div class="priority-button" id="jumpingjacks_med">med</div>
       <div class="priority-button" id="jumpingjacks_low">low</div>
   </div>
   <div class="generate-button" id="generateRoutine">Generate Routine</div>
   <div id="showResults"></div>
</div>`;

activities.forEach((x) => { const y = x; y.percentage = 100 / activities.length; });
const prioritiesArr = ['high', 'med', 'low'];
const changePercentage = (activity, priority) => {
  let percentage;
  switch (priority) {
    default:
      alert('Unknown error ;)');
      break;
    case 'high':
      percentage = 50;
      break;
    case 'med':
      percentage = 30;
      break;
    case 'low':
      percentage = 20;
  }
  switch (activity) {
    default:
      alert('Unknown error ;)');
      break;
    case 'walking':
      walking.percentage = percentage;
      break;
    case 'running':
      running.percentage = percentage;
      break;
    case 'jumping jacks':
      jumpingjacks.percentage = percentage;
  }
};

const splitPriority = () => {
  walking.percentage = 33.33333333333333;
  running.percentage = 33.33333333333333;
  jumpingjacks.percentage = 33.33333333333333;
};

// ADDING EVENTS TO PRIORITY BUTTONS
let activityhigh = 'walking'; let activitymed = 'running'; let activitylow = 'jumping jacks';

const changeInnerPriority = (a, priority) => {
  prioritiesArr.forEach((p) => {
    if (p !== priority) {
      document.getElementById(`${removeSpace(a)}_${p}`).style.backgroundColor = regColor;
    }
  });
};
const changingPriority = (activity, priority) => {
  let from;
  const newPriority = (h, m, l) => { activityhigh = h; activitymed = m; activitylow = l; };
  ['high', 'med', 'low'].forEach((x) => { if (document.getElementById(`${removeSpace(activity)}_${x}`).style.backgroundColor === priorityColor) { from = x; } });
  document.getElementById(`${removeSpace(activity)}_${priority}`).style.backgroundColor = priorityColor;
  changeInnerPriority(activity, priority);
  let newhigh; let newmed; let newlow;
  console.log(activity, activityhigh);
  if (priority === 'high' && activity !== activityhigh) {
    if (from === 'med') {
      newhigh = activity;
      newmed = activityhigh;
      newlow = activitylow;
      newPriority(newhigh, newmed, newlow);
    }
    if (from === 'low') {
      newhigh = activity;
      newmed = activitymed;
      newlow = activityhigh;
      newPriority(newhigh, newmed, newlow);
    }
  }
  if (priority === 'med' && activity !== activitymed) {
    if (from === 'high') {
      newmed = activity;
      newhigh = activitymed;
      newlow = activitylow;
      newPriority(newhigh, newmed, newlow);
    }
    if (from === 'low') {
      newmed = activity;
      newlow = activitymed;
      newhigh = activityhigh;
      newPriority(newhigh, newmed, newlow);
    }
  }
  if (priority === 'low' && activity !== activitylow) {
    if (from === 'med') {
      newlow = activity;
      newmed = activitylow;
      newhigh = activityhigh;
      newPriority(newhigh, newmed, newlow);
    }
    if (from === 'high') {
      newlow = activity;
      newmed = activitymed;
      newhigh = activitylow;
      newPriority(newhigh, newmed, newlow);
    }
  }
  console.log(activityhigh, activitymed, activitylow);
  activities.forEach((x) => {
    if (x.activity === activityhigh) {
      document.getElementById(`${removeSpace(x.activity)}_high`).style.backgroundColor = priorityColor;
      changePercentage(x.activity, 'high');
      changeInnerPriority(x.activity, 'high');
    } else if (x.activity === activitymed) {
      document.getElementById(`${removeSpace(x.activity)}_med`).style.backgroundColor = priorityColor;
      changePercentage(x.activity, 'med');
      changeInnerPriority(x.activity, 'med');
    } else if (x.activity === activitylow) {
      document.getElementById(`${removeSpace(x.activity)}_low`).style.backgroundColor = priorityColor;
      changePercentage(x.activity, 'low');
      changeInnerPriority(x.activity, 'low');
    }
  });
};


const createRoutine = ({
  activity, metric, cal, percentage,
}) => {
  const calPerMetric = cal * user.weight;
  const fullAmount = user.targetBurn / calPerMetric;
  const amountNeeded = fullAmount * percentage / 100;
  const calsBurned = calPerMetric * amountNeeded;
  return `<div>${Math.round(amountNeeded * 10) / 10} ${metric}s of ${activity}: ${Math.round(calsBurned * 10) / 10} <div>`;
};
const executeRoutine = () => { document.getElementById('showResults').innerHTML = activities.flatMap(createRoutine).join(''); };
const targetCal = () => document.getElementById('target-cal').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    user.targetBurn = event.target.value;
    executeRoutine();
  }
});
