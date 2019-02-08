/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-env browser, true */
const user = {
  weight: 0,
  metric: 'lb',
  targetBurn: 0,
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
// MAIN VARIABLES
const [walking, running, jumpingjacks] = activities;
const weightInputBox = document.getElementById('weight-input');
const weightInputMetric = document.getElementById('weightInputMetric');
const displayTotalBurn = document.getElementById('totalBurn');
const totalBurnDom = document.getElementById('totalBurnRes');
let prevWeight = 0;
let weightMetric = 'lb';
let option = '';
let currentSpeed = 6;
let activityMetric = 'mi';

// MAIN FUNCTIONS

const removeNum = str => str.replace(/[0-9]/g, '');
const removeChar = str => str.replace(/\D/g, '');
const removeSpace = str => str.replace(/\s/g, '');
const kiloToPounds = x => x / 0.453592;
const convertKmToMiles = x => x / 1.609344;
const changeInnerHtml = (id, change) => { document.getElementById(id).innerHTML = change; };
const calculateBurn = ({ cal, amount }, { weight }) => parseInt(cal * weight * amount, 10);
const updateTotalBurn = () => {
  totalBurnDom.innerHTML = walking.burn + running.burn + jumpingjacks.burn;
};
const updateUserWeight = (weight) => {
  let pounds;
  if (weightMetric === 'lb') {
    pounds = weight;
  } else {
    pounds = kiloToPounds(parseInt(weight, 10));
  }
  user.weight = pounds;
};
const constructActivity = ({ activity }) => {
  const activityNs = removeSpace(activity);
  const basicString = `<li> <div class="input-items activity-input"> <input type="text" onkeypress="return numOnly(event)" class="input-info" autocomplete="off" maxlength="3" id="${activityNs}-input"><label id="${activityNs}Label">${activity}</label> <div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </li>`;
  const runningString = `<li> <div class="input-items activity-input"> <input type="text" onkeypress="return numOnly(event)" class="input-info" autocomplete="off" maxlength="3"  id="${activityNs}-input"><input type="text" maxlength= "2" onkeypress="return numOnly(event)" class="speed-input" id="speedValue" value="6"><div class="mph">mph</div> <label id="${activityNs}Label">${activity}</label><div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </li>`;
  const output = (activity === 'running') ? runningString : basicString;
  return output;
};
const addEventForCals = (activityData) => {
  const id = removeNum(activityData); // Stripping number to just get activity
  document.getElementById(`${id}-input`).addEventListener('keyup', (event) => {
    let distanceValue;
    const num = removeChar(activityData); // getting number corresponding to activities object
    distanceValue = (activityMetric === 'mi') ? distanceValue = event.target.value : distanceValue = convertKmToMiles(event.target.value);
    activities[num].amount = distanceValue;
    changeInnerHtml(`calorie${id}`, `${calculateBurn(activities[num], user)}`); // Updating Cal Values
    activities[num].burn = calculateBurn(activities[num], user);
    updateTotalBurn();
  });
};
const addListenerEventToActivities = () => { ['walking0', 'running1', 'jumpingjacks2'].forEach((x) => { addEventForCals(x); }); };
const updateCalories = () => {
  if (option === 'calc') {
    running.burn = calculateBurn(running, user);
    walking.burn = calculateBurn(walking, user);
    jumpingjacks.burn = calculateBurn(jumpingjacks, user);
    document.getElementById('calorierunning').innerHTML = ` ${calculateBurn(running, user)} `;
    document.getElementById('caloriewalking').innerHTML = calculateBurn(walking, user);
    document.getElementById('caloriejumpingjacks').innerHTML = calculateBurn(jumpingjacks, user);
    updateTotalBurn();
  }
};
const updateValues = (a) => {
  const value = parseInt(document.getElementById(`${a}-input`).value, 10);
  console.log(activityMetric);
  const distanceValue = (activityMetric === 'km') ? convertKmToMiles(value) : value;
  if (distanceValue > 0) {
    switch (a) {
      default:
        alert('Unknown error ;)');
        break;
      case 'walking':
        walking.amount = distanceValue;
        walking.burn = calculateBurn(walking, user);
        changeInnerHtml(`calorie${a}`, calculateBurn(walking, user));
        break;
      case 'running':
        running.amount = distanceValue;
        running.burn = calculateBurn(running, user);
        changeInnerHtml(`calorie${a}`, calculateBurn(running, user));
        break;
      case 'jumping jacks':
        jumpingjacks.amount = distanceValue;
        jumpingjacks.burn = calculateBurn(jumpingjacks, user);
        changeInnerHtml(`calorie${a}`, calculateBurn(running, user));
    }
    updateTotalBurn();
  }
};
const changeMetric = (x) => {
  const metricDom = document.getElementById(`${x}InputMetric`);
  switch (weightMetric) {
    default:
      alert('Unknown error ;)');
      break;
    case 'lb':
      metricDom.innerHTML = '<p>kg</p>';
      break;
    case 'kg':
      metricDom.innerHTML = '<p>lb</p>';
      break;
  }
};
// LISTENER EVENT FUNCTIONS
const editWeight = () => {
  prevWeight = weightInputBox.value;
  weightInputBox.readOnly = false;
  weightInputBox.focus();
  weightInputBox.value = '';
  document.getElementById('weightInputMetric').innerHTML = '<p class="cancel" id="cancelButton">cancel</p>';
  document.getElementById('cancelButton').addEventListener('click', () => cancelEdit()); // Add Event For Edit Button
};
const cancelEdit = () => {
  changeInnerHtml('weightInputMetric', '<p class="edit-button" id="editButton">edit</p>');
  weightInputBox.value = prevWeight;
  weightInputBox.readOnly = true;
  // eslint-disable-next-line no-use-before-define
  document.getElementById('editButton').addEventListener('click', () => editWeight()); // Add Event For Edit Button
};
const addEventForSpeed = () => {
  const speedInput = document.getElementById('speedValue');
  speedInput.addEventListener('keyup', (event) => {
    const speed = event.target.value;
    running.cal = 0.1261904761904762; // amount of cals to add for each speed(mph) increase
    running.cal *= speed;
    document.getElementById('calorierunning').innerHTML = `${calculateBurn(running, user)}`;
    running.burn = calculateBurn(running, user);
    updateTotalBurn();
  });
  // Saves the previous Value of speed(mph) and clears input for new value
  speedInput.addEventListener('focus', () => {
    currentSpeed = parseInt(speedInput.value, 10);
    speedInput.value = '';
  });
  // Checks for new speed(mph) If not it reverts to the previous speed saved in Current Speed
  speedInput.addEventListener('focusout', () => {
    if (speedInput.value.length === 0) {
      speedInput.value = currentSpeed;
    } else {
      currentSpeed = speedInput.value;
    }
  });
};
const addEventForToggle = (x) => {
  const toggleCircle = document.getElementById(`${x}ToggleCircle`);
  const rightToggle = document.getElementById(`${x}RightToggle`);
  const leftToggle = document.getElementById(`${x}LeftToggle`);
  if (x === 'mile') {
    const toggle = document.getElementById(`${x}ToggleContainer`);
    const duration = 100;
    toggle.addEventListener(('click'), () => {
      if (activityMetric === 'mi') {
        activityMetric = 'km';
        ['walking', 'running'].forEach((act) => { updateValues(act); });
        rightToggle.style.fontWeight = 'bolder';
        leftToggle.style.fontWeight = '100';
        Velocity(toggleCircle, { left: '20px' }, duration, 'swing');
        ['walkingInputMetric', 'runningInputMetric'].forEach(y => changeInnerHtml(y, '<p>km</p>')); // Change Metric Dom (km)
      } else {
        activityMetric = 'mi';
        ['walking', 'running'].forEach((act) => { updateValues(act); });
        console.log(activityMetric);
        rightToggle.style.fontWeight = '100';
        leftToggle.style.fontWeight = 'bolder';
        Velocity(toggleCircle, { left: '5px' }, duration, 'swing');
        ['walkingInputMetric', 'runningInputMetric'].forEach(z => changeInnerHtml(z, '<p>mi</p>')); // Change Metric Dom (mi)
      }
    });
    return;
  }
  const toggle = document.getElementById(`${x}ToggleContainer`);

  toggle.addEventListener('click', () => {
    const duration = 100;
    if (weightMetric === 'lb' && toggleCircle.className !== 'velocity-animating') {
      Velocity(toggleCircle, { left: '20px' }, duration, 'swing');
      if (user.weight === 0) {
        changeMetric(x);
      }
      rightToggle.style.fontWeight = 'bolder';
      leftToggle.style.fontWeight = '100';
      weightMetric = 'kg';
    } else if (weightMetric === 'kg' && toggleCircle.className !== 'velocity-animating') {
      Velocity(toggleCircle, { left: '5px' }, duration, 'swing');
      if (user.weight === 0) {
        changeMetric(x);
      }
      rightToggle.style.fontWeight = '100';
      leftToggle.style.fontWeight = 'bolder';
      weightMetric = 'lb';
    }
  });
};
const addEventLabel = (x) => {
  const input = document.getElementById(`${x}-input`);
  input.addEventListener('focus', () => {
    const label = document.getElementById(`${x}Label`);
    Velocity(label, { top: '-25px' }, 100, 'ease-in');
  });
  input.addEventListener('focusout', () => {
    if (input.value === '') {
      const label = document.getElementById(`${x}Label`);
      Velocity(label, { top: '25px' }, 100, 'ease-in');
    }
  });
};
const chosenOptionsAnimation = () => {
  if (option !== 'calc') {
    if (document.getElementById('buttonContainer').className !== 'velocity-animating') {
      Velocity(document.getElementById('buttonContainer'), { top: '10px' }, 500, 'ease-in');
      displayTotalBurn.style.display = 'block';
      Velocity(displayTotalBurn, { opacity: '1' }, 600, 'ease-in');
    }
    changeInnerHtml('container', '');
    activities.forEach((x) => { document.getElementById('container').innerHTML += constructActivity(x); });
    activities.forEach((x) => { addEventLabel(removeSpace(x.activity)); });
    addListenerEventToActivities();
    addEventForSpeed();
    addEventForToggle('mile');
    option = 'calc';
  }
};

// CALCULATOR OPTION LOGIC
document.getElementById('calculator-button').addEventListener('click', () => chosenOptionsAnimation()); // Add Event For Animation
const weightInput = document.getElementById('weight');

// WeightAnimation
const info = document.getElementById('info');
const note = document.getElementById('note');
const weightAnimation = () => {
  weightInputMetric.innerHTML = '<p class="edit-button" id="editButton">edit</p>';
  document.getElementById('editButton').addEventListener('click', () => editWeight()); // Add Event For Edit Button
  Velocity(weightInput, { top: '90%' }, 500, 'easeOutBounce');
  Velocity(info, { left: '200%' }, 200, 'ease-in');
  Velocity(note, { opacity: 0 }, 200, 'ease-in');
  setTimeout(() => { note.style.display = 'none'; }, 200);
};

// WEIGHT INPUT LOGIC
addEventForToggle('weight');
weightInput.addEventListener('keyup', (event) => {
  event.stopPropagation();
  event.preventDefault();
  if (event.keyCode === 13) {
    if (event.target.value < 10) {
      if (weightInput.className !== 'input-items velocity-animating') {
        for (let i = 0; i < 2; i += 1) {
          weightInput.velocity({ left: '10px' }, 50, 'easeInSine');
          weightInput.velocity({ left: '-10px' }, 50, 'easeInSine');
        }
      }
      weightInput.velocity({ left: '0px' }, 100, 'ease-in');
      return;
    }
    const pounds = parseInt(event.target.value, 10);
    updateUserWeight(pounds);
    updateCalories();
    weightAnimation();
    changeInnerHtml('weightLabel', 'Your Weight');
    setTimeout(() => { document.getElementById('buttonContainer').style.display = 'block'; }, 300);
    weightInput.readOnly = true;
  }
});

const convertableMetrcis = ['weight', 'mile'];

// ROUTINE GENERATOR LOGIC
document.getElementById('routine-button').addEventListener('click', () => {
  if (option !== 'routine') {
    if (document.getElementById('buttonContainer').className !== 'velocity-animating') {
      Velocity(document.getElementById('buttonContainer'), { top: '10px' }, 500, 'ease-in');
    }
    displayTotalBurn.style.display = 'none';
    changeInnerHtml('container', '<input type="text" id="target-cal" placeholder="How many calories would you like to burn in a day"></input>');
    targetCal();
    option = 'routine';
  }
});
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
changePercentage('walking', 'high');
changePercentage('running', 'med');
changePercentage('jumping jacks', 'low');

// ADDING EVENTS TO PRIORITY BUTTONS
let activityhigh = 'walking'; let activitymed = 'running'; let activitylow = 'jumping jacks';

const changeInnerPriority = (a, priority) => {
  prioritiesArr.forEach((p) => {
    if (p !== priority) {
      document.getElementById(`${removeSpace(a)}_${p}`).style.backgroundColor = 'yellow';
    }
  });
};
const changingPriority = (activity, priority) => {
  let from;
  const newPriority = (h, m, l) => { activityhigh = h; activitymed = m; activitylow = l; };
  ['high', 'med', 'low'].forEach((x) => { if (document.getElementById(`${removeSpace(activity)}_${x}`).style.backgroundColor === 'black') { from = x; } });
  document.getElementById(`${removeSpace(activity)}_${priority}`).style.backgroundColor = 'black';
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
      document.getElementById(`${removeSpace(x.activity)}_high`).style.backgroundColor = 'black';
      changePercentage(x.activity, 'high');
      changeInnerPriority(x.activity, 'high');
    } else if (x.activity === activitymed) {
      document.getElementById(`${removeSpace(x.activity)}_med`).style.backgroundColor = 'black';
      changePercentage(x.activity, 'med');
      changeInnerPriority(x.activity, 'med');
    } else if (x.activity === activitylow) {
      document.getElementById(`${removeSpace(x.activity)}_low`).style.backgroundColor = 'black';
      changePercentage(x.activity, 'low');
      changeInnerPriority(x.activity, 'low');
    }
  });
};

document.getElementById(`${removeSpace(activityhigh)}_high`).style.backgroundColor = 'black';
document.getElementById(`${removeSpace(activitymed)}_med`).style.backgroundColor = 'black';
document.getElementById(`${removeSpace(activitylow)}_low`).style.backgroundColor = 'black';
activities.forEach(({ activity }) => {
  prioritiesArr.forEach((priority) => {
    const button = document.getElementById(`${removeSpace(activity)}_${priority}`);
    button.addEventListener(('click'), (event) => {
      changingPriority(activity, priority, event.target.id);
    });
  });
});

const createRoutine = ({
  activity, metric, cal, percentage,
}) => {
  const calPerMetric = cal * user.weight;
  const fullAmount = user.targetBurn / calPerMetric;
  const amountNeeded = fullAmount * percentage / 100;
  const calsBurned = calPerMetric * amountNeeded;
  return `<div>${Math.round(amountNeeded * 10) / 10} ${metric}s of ${activity}: ${Math.round(calsBurned * 10) / 10} <div>`;
};
const executeRoutine = () => { document.getElementById('container').innerHTML = activities.map(createRoutine).join(''); };
const targetCal = () => document.getElementById('target-cal').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    user.targetBurn = event.target.value;
    executeRoutine();
  }
});
