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

const [walking, running, jumpingjacks] = activities;
let currentDistanceMetric = 'mi';
const removeNum = str => str.replace(/[0-9]/g, '');
const removeChar = str => str.replace(/\D/g, '');
const removeSpace = str => str.replace(/\s/g, '');
const weightInputBox = document.getElementById('weight-input');
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX + 121,
    top: rect.top + window.scrollY + 20,
  };
}
const kiloToPounds = x => x / 0.453592;
const convertKmToMiles = x => x / 1.609344;
const getResponse = (x) => { if (x === 'jumping jacks') { return 'minutes'; } return 'miles'; };
activities.forEach((x) => { const y = x; y.percentage = 100 / activities.length; });
let high; let med; let low;
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
// const addEventRoutineButtons =
activities.forEach(({ activity }) => {
  ['high', 'med', 'low'].forEach((priority) => {
    const button = document.getElementById(`${removeSpace(activity)}${priority}`);
    button.addEventListener(('click'), () => {
      button.style.backgroundColor = 'black';
    });
  });
});
const setPriority = '';
const weightInput = document.getElementById('weight');
let prevWeight = 0;
// WeightAnimation
const addEventToCancel = () => {
  document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('weightInputMetric').innerHTML = '<p class="edit-button" id="editButton">edit</p>';
    weightInputBox.value = prevWeight;
    weightInputBox.readOnly = true;
    // eslint-disable-next-line no-use-before-define
    addEventToChange();
  });
};
let weightMetric = 'lb';
const addEventToChange = () => {
  document.getElementById('editButton').addEventListener('click', () => {
    prevWeight = weightInputBox.value;
    weightInputBox.readOnly = false;
    weightInputBox.focus();
    weightInputBox.value = '';
    document.getElementById('weightInputMetric').innerHTML = '<p id="cancel">cancel</p>';
    addEventToCancel();
  });
};

const info = document.getElementById('info');
const note = document.getElementById('note');
const weightAnimation = () => {
  document.getElementById('weightInputMetric').innerHTML = '<p class="edit-button" id="editButton">edit</p>';
  addEventToChange();
  Velocity(weightInput, { top: '90%' }, 500, 'easeOutBounce');
  Velocity(info, { left: '200%' }, 200, 'ease-in');
  Velocity(note, { opacity: 0 }, 200, 'ease-in');
  setTimeout(() => { note.style.display = 'none'; }, 200);
};

// WEIGHT INPUT LOGIC

weightInput.addEventListener('keyup', (event) => {
  const currentMetric = removeSpace(document.getElementById('weightInputMetric').innerText);
  event.stopPropagation();
  event.preventDefault();
  if (event.keyCode === 13) {
    if (event.target.value < 20) {
      if (weightInput.className !== 'input-items velocity-animating') {
        for (let i = 0; i < 2; i += 1) {
          weightInput.velocity({ left: '10px' }, 50, 'easeInSine');
          weightInput.velocity({ left: '-10px' }, 50, 'easeInSine');
        }
      }
      weightInput.velocity({ left: '0px' }, 100, 'ease-in');
      return false;
    }
    let pounds = event.target.value;
    if (currentMetric === 'lb' || weightMetric === 'lb') {
      weightMetric = 'lb';
      pounds = event.target.value;
    } else {
      weightMetric = 'kg';
      pounds = kiloToPounds(parseInt(event.target.value, 10));
    }
    user.weight = pounds;
    weightAnimation();
    document.getElementById('weightLabel').innerHTML = 'Your Weight';
    setTimeout(() => { document.getElementById('buttonContainer').style.display = 'block'; }, 300);
    document.getElementById('weight-input').readOnly = true;
  }
});
const toggled = 0;
const calculateTotalBurn = () => walking.burn + running.burn + jumpingjacks.burn;
// BASIC CALCULATOR FUNCTION AND LOGIC
const calculateBurn = ({ cal, amount }, { weight }) => parseInt(cal * weight * amount, 10);
const addEventForCals = (x) => {
  const id = removeNum(x);
  document.getElementById(`${id}-input`).addEventListener('keyup', (event) => {
    event.stopPropagation();
    event.preventDefault();
    let distanceValue;
    const num = removeChar(x);
    if (currentDistanceMetric === 'mi') {
      distanceValue = event.target.value;
    } else {
      distanceValue = convertKmToMiles(event.target.value);
    }
    activities[num].amount = distanceValue;
    document.getElementById(`calorie${id}`).innerHTML = `${calculateBurn(activities[num], user)}`;
    activities[num].burn = calculateBurn(activities[num], user);
    document.getElementById('totalBurnRes').innerHTML = calculateTotalBurn();
  });
};
// const changeMetric = () => {
// activities.forEach((x) => { if (x.activity !== 'jumping jacks') { const test = document.getElementById(`${x.activity}cals`); if (document.getElementById(x.activity).value > 0) { test.innerHTML = `${calculateBurn(x, user)} Calories Burned`; } } });
// convertKmToMiles();
// };
const changeMetric = (x) => {
  const thisMetric = document.getElementById(`${x}InputMetric`);
  const stripped = removeSpace(thisMetric.innerText);
  switch (stripped) {
    default:
      alert('Unknown error ;)');
      break;
    case 'lb':
      thisMetric.innerHTML = '<p>kg</p>';
      break;
    case 'kg':
      thisMetric.innerHTML = '<p>lb</p>';
      break;
  }
};
const convertableMetrcis = ['weight', 'mile'];

const changeInnerHtml = (id, change) => { document.getElementById(id).innerHTML = change; };
const updateValues = (a, metric) => {
  let distanceValue;
  if (metric === 'km') {
    distanceValue = convertKmToMiles(parseInt((document.getElementById(`${a}-input`).value), 10));
  } else {
    distanceValue = parseInt(document.getElementById(`${a}-input`).value, 10);
  }
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
    console.log(calculateBurn(running, user));
    changeInnerHtml('totalBurnRes', calculateTotalBurn());
  }
};

const addEventForToggle = (x) => {
  const toggleCircle = document.getElementById(`${x}ToggleCircle`);
  const rightToggle = document.getElementById(`${x}RightToggle`);
  const leftToggle = document.getElementById(`${x}LeftToggle`);
  if (x === 'mile') {
    const toggle = document.getElementById(`${x}ToggleContainer`);
    const duration = 100;
    toggle.addEventListener(('click'), () => {
      const innerMetric = removeSpace(document.getElementById('walkingInputMetric').innerText);
      if (innerMetric === 'mi') {
        currentDistanceMetric = 'km';
        updateValues('walking', 'km');
        updateValues('running', 'km');
        rightToggle.style.fontWeight = 'bolder';
        leftToggle.style.fontWeight = '100';
        Velocity(toggleCircle, { left: '20px' }, duration, 'swing');
        ['walkingInputMetric', 'runningInputMetric'].forEach(y => changeInnerHtml(y, '<p>km</p>'));
      } else {
        updateValues('walking', 'mi');
        updateValues('running', 'mi');
        currentDistanceMetric = 'mi';
        rightToggle.style.fontWeight = '100';
        leftToggle.style.fontWeight = 'bolder';
        Velocity(toggleCircle, { left: '5px' }, duration, 'swing');
        ['walkingInputMetric', 'runningInputMetric'].forEach(z => changeInnerHtml(z, '<p>mi</p>'));
      }
    });
    return false;
  }
  const getMetric = document.getElementById(`${x}InputMetric`);
  let thisMetric = removeSpace(getMetric.innerText);
  const toggle = document.getElementById(`${x}ToggleContainer`);

  toggle.addEventListener('click', () => {
    const duration = 100;
    if (thisMetric === 'lb' && toggleCircle.className !== 'velocity-animating') {
      Velocity(toggleCircle, { left: '20px' }, duration, 'swing');
      changeMetric(x);
      rightToggle.style.fontWeight = 'bolder';
      leftToggle.style.fontWeight = '100';
      thisMetric = removeSpace(getMetric.innerText);
    } else if (thisMetric === 'kg' && toggleCircle.className !== 'velocity-animating') {
      Velocity(toggleCircle, { left: '5px' }, duration, 'swing');
      changeMetric(x);
      rightToggle.style.fontWeight = '100';
      leftToggle.style.fontWeight = 'bolder';
      thisMetric = removeSpace(getMetric.innerText);
    }
  });
};
addEventForToggle('weight');

const addListenerEventToActivities = () => { ['walking0', 'running1', 'jumpingjacks2'].forEach((x) => { addEventForCals(x); }); };
let currentSpeed = 6;
const addEventForSpeed = () => {
  const speedInput = document.getElementById('speedValue');
  speedInput.addEventListener('keyup', (event) => {
    const speed = event.target.value;
    running.cal = 0.1261904761904762;
    running.cal *= speed;
    document.getElementById('calorierunning').innerHTML = `${calculateBurn(running, user)}`;
    running.burn = calculateBurn(running, user);
    document.getElementById('totalBurnRes').innerHTML = calculateTotalBurn();
  });
  speedInput.addEventListener('focus', (event) => {
    currentSpeed = parseInt(speedInput.value, 10);
    speedInput.value = '';
  });
  speedInput.addEventListener('focusout', (event) => {
    if (speedInput.value.length === 0) {
      speedInput.value = currentSpeed;
    } else {
      currentSpeed = speedInput.value;
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
// FOR CALCULATOR BUTTON
const constructActivity = ({ activity }) => {
  const activityNs = removeSpace(activity);
  const basicString = `<li> <div class="input-items activity-input"> <input type="text" class="input-info" autocomplete="off" maxlength="3" id="${activityNs}-input"><label id="${activityNs}Label">${activity}</label> <div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </li>`;
  const runningString = `<li> <div class="input-items activity-input"> <input type="text" class="input-info" autocomplete="off" maxlength="3"  id="${activityNs}-input"><input type="text" class="speed-input" id="speedValue" value="6"><div class="mph">mph</div> <label id="${activityNs}Label">${activity}</label><div class="input-metric" id="${activityNs}InputMetric"><p>mi</p></div> <div class="calories-burned">Calories Burned<span class="calorie-counter" id="calorie${activityNs}"> 0 </span></div> </div> </li>`;
  const output = (activity === 'running') ? runningString : basicString;
  return output;
};
const displayTotalBurn = document.getElementById('totalBurn');
let option = '';
let animation = 0;
document.getElementById('calculator-button').addEventListener('click', () => {
  if (option !== 'calc') {
    if (document.getElementById('buttonContainer').className !== 'velocity-animating') {
      Velocity(document.getElementById('buttonContainer'), { top: '10px' }, 500, 'ease-in');
      displayTotalBurn.style.display = 'block';
      Velocity(displayTotalBurn, { opacity: '1' }, 600, 'ease-in');
      animation = 1;
    }
    document.getElementById('container').innerHTML = '';
    activities.forEach((x) => { document.getElementById('container').innerHTML += constructActivity(x); });
    activities.forEach((x) => { addEventLabel(removeSpace(x.activity)); });
    addListenerEventToActivities();
    addEventForSpeed();
    addEventForToggle('mile');
    option = 'calc';
  }
});
// ROUTINE GENERATOR LOGIC
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
document.getElementById('routine-button').addEventListener('click', () => {
  if (option !== 'routine') {
    if (animation !== 1) {
      Velocity(document.getElementById('buttonContainer'), { top: '10px' }, 500, 'ease-in');
      animation = 1;
    }
    document.getElementById('container').innerHTML = '<input type="text" id="target-cal" placeholder="How many calories would you like to burn in a day"></input>'; targetCal();
    option = 'routine';
  }
});
