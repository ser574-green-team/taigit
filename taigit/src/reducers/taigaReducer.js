
import { GRAB_TAIGA_DATA, GET_SPRINT_STATS, GET_SPRINT_NAMES, GET_SINGLE_SPRINT_STATS } from '../actions/taigaActions';
import colors from '../styles/colors';

const initialState = {
  taigaData: 'initialData',
  sprintList: [],
  sprintStats: {},
  singleSprintStats: [],
}

/**
 * Taiga Reducer
 * Gets called each time there's an action
 * If the action.type is one the taiga reducer cares about,
 * we update the current state with the payload of the action
 */
export default function taigaReducer(state = initialState, action) {
  switch(action.type) {
    case GRAB_TAIGA_DATA: 
      console.log('in reducer of grab taiga data');
      console.log('payload is: ', action.payload);
      console.log('returning state', { ...state, taigaData: action.payload });
      
      // Return new object of current state spread and new property (taigaData)
      return {
        ...state,
        taigaData: action.payload
      }
    case GET_SPRINT_STATS:
      console.log('got sprint stats');
      console.log('stats: ', action.payload);
      return {
        ...state,
        sprintStats: action.payload
      }
    case GET_SINGLE_SPRINT_STATS:
      console.log('got sprint stats');
      console.log('singleSprintStats: ', action.payload);
      return {
        ...state,
        singleSprintStats: action.payload
      }
    case GET_SPRINT_NAMES:
      console.log("Get sprint name");
      return {
        ...state,
        sprintList: action.payload
      }
    default:
      return state;
  }
}

/**
 * Getting current sprint task progress
 * In chartjs pie chart format
 */
export const selectSprintProgressChartData = (state) => {
  const totalTasks = state.sprintStats.total_tsks;
  const totalCompletedTasks = state.sprintStats.completed_tsks;
  const totalInProgressTasks = totalTasks - totalCompletedTasks;
  return {
    labels: ["Completed", "In Progress"],
    datasets: [{
      label: 'Task Progress',
      data: [totalCompletedTasks, totalInProgressTasks],
      backgroundColor: [
          colors.blue.dark,
          colors.none
      ],
    }]
  }
}

export const selectUserTaskDistributionChartData = (state) => {
  return {
    labels: ['Rodney', 'Berta', 'Steve', 'Remy', 'Hugo'],
    datasets: [{
      label: 'Completed',
      backgroundColor: 'rgb(242, 105, 104, 1)',
      stack: 'Stack 0',
      data: [2, 3, 1, 5, 2]
    }, {
      label: 'In Progress',
      backgroundColor: 'rgb(242, 173, 159, 1)',
      stack: 'Stack 0',
      data: [4, 3, 2, 1, 5]
    }]
  }
}

export const selectSprintBurndownChartData = (state) => {
  const burndownInfo = state.sprintStats.burndown || [];
  const days = burndownInfo.map((sprintDay) => sprintDay.day);
  const openPoints = burndownInfo.map((sprintDay) => sprintDay.open_points);
  const optimalPoints = burndownInfo.map((sprintDay) => sprintDay.optimal_points);
  return{
    labels: days,
      datasets: [{
          fill: false,
          label: 'Ideal Burndown',
          color: 'rgba(255,0,0,0.25)',
          lineWidth: 2,
          data: optimalPoints,
          backgroundColor: [colors.red.base],
          borderColor: [colors.red.base]
        },
        {
          fill: false,
          label: 'Actual Burndown',
          color: 'rgba(0,120,200,0.75)',
          marker: {
            radius: 6
          },
          data: openPoints,
          backgroundColor: [colors.blue.base],
          borderColor: [colors.blue.base]
        }]
  }
}

/**
 * Getting list of sprints
 * Returns an array of sprint names wrapped in objects
 * that the sprint dropdown component will render
 */
export const selectSprintList = (state) => {
  //console.log(state.taiga.taigaData);
  return state.sprintList.map(sprintName => {
    return {
      value: sprintName.id,
      label: sprintName.name
    }
  });
}


export const selectSingleSprintData = (state) => {
  let taigaSingleSprinttask = state.singleSprintStats;
  let dictToProcessData = {};
  // Deserialzation of received data from backend
  let unassignedTaskCount = 0;
  for (let i = 0; i < taigaSingleSprinttask.length; i++) {
    let name = taigaSingleSprinttask[i]['name'];
    dictToProcessData[name] = {
      'inprogress_task_count': 0,
      'closed_task_count': 0,
      'task_ready_for_test_count': 0,
    };
    dictToProcessData[name]['inprogress_task_count'] = taigaSingleSprinttask[i]['inprogress_task_count'];
    dictToProcessData[name]['closed_task_count'] = taigaSingleSprinttask[i]['closed_task_count'];
    dictToProcessData[name]['task_ready_for_test_count'] = taigaSingleSprinttask[i]['task_ready_for_test_count'];
    unassignedTaskCount += taigaSingleSprinttask[i]['new_task_count'];
  }
  // create X and Y axis data
  let xAxisNameData = [];
  let closedTaskCount = [];
  let readyForTestTaskCount = [];
  let newTaskCount = [];
  let inprogressTaskCount = [];

  for (let name in dictToProcessData) {
    xAxisNameData.push(name);
    closedTaskCount.push(dictToProcessData[name]['closed_task_count']);
    readyForTestTaskCount.push(dictToProcessData[name]['task_ready_for_test_count']);
    newTaskCount.push(0);
    inprogressTaskCount.push(dictToProcessData[name]['inprogress_task_count']);
  }
  // Keep Track of unassigned/New Task
  xAxisNameData.push('Unassigned');
  newTaskCount.push(unassignedTaskCount);
  return {
    labels: xAxisNameData,
    datasets: [{
      label: 'Completed',
      backgroundColor: colors.green.light,
      stack: 'Stack 0',
      data: closedTaskCount
    }, {
      label: 'In Progress',
      backgroundColor: colors.yellow.base,
      stack: 'Stack 0',
      data: inprogressTaskCount
    }, {
      label: 'Unassigned/New',
      backgroundColor: colors.red.base,
      stack: 'Stack 0',
      data: newTaskCount
    }, {
      label: 'Ready for Test',
      backgroundColor: colors.blue.base,
      stack: 'Stack 0',
      data: readyForTestTaskCount
    }]
  }

}