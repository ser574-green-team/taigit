import { GRAB_TAIGA_DATA, GET_SPRINT_STATS, GET_TASK_STATS } from '../actions/taigaActions';
import colors from '../styles/colors';

const initialState = {
  taigaData: 'initialData',
  sprintList: ['Sprint 1', 'Sprint 2', 'Sprint 3'],
  sprintStats: {},
  taigaTaskStats: [],
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
        taigaProjectData: action.payload
      }
    case GET_SPRINT_STATS:
      console.log('got sprint stats');
      console.log('stats: ', action.payload);
      return {
        ...state,
        sprintStats: action.payload
      }
    case GET_TASK_STATS:
      //console.log('in Task details reducer');
      return {
        ...state,
        taigaTaskStats: action.payload
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
  var backgroundColor = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)'
  ];
  let taigaTaskStatsArr = state.taigaTaskStats;
  let dictToProcessData = {};
  // Deserialzation of received data from backend
  for (let i = 0; i < taigaTaskStatsArr.length; i++) {
    for (let j = 0; j < taigaTaskStatsArr[i].length; j++) {
      let name = taigaTaskStatsArr[i][j]['name'];
      if (name in dictToProcessData) {
        dictToProcessData[name]['inprogress_task_count'] += taigaTaskStatsArr[i][j]['inprogress_task_count'];
        dictToProcessData[name]['closed_task_count'] += taigaTaskStatsArr[i][j]['closed_task_count'];
        dictToProcessData[name]['task_ready_for_test_count'] += taigaTaskStatsArr[i][j]['task_ready_for_test_count'];
        dictToProcessData[name]['new_task_count'] += taigaTaskStatsArr[i][j]['new_task_count'];
      } else {
        dictToProcessData[name] = {'inprogress_task_count' : 0,
                                      'closed_task_count' : 0,
                                      'task_ready_for_test_count' :0,
                                      'new_task_count': 0,
                                      };
      }
    }
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
    newTaskCount.push(dictToProcessData[name]['new_task_count']);
    inprogressTaskCount.push(dictToProcessData[name]['inprogress_task_count']);
  } 
  
  return {
    labels: xAxisNameData,
    datasets: [{
      label: 'Completed',
      backgroundColor: backgroundColor[0],
      stack: 'Stack 0',
      data: closedTaskCount
    }, {
      label: 'In Progress',
      backgroundColor: backgroundColor[1],
      stack: 'Stack 0',
      data: inprogressTaskCount
    }, {
      label: 'Unassigned/New',
      backgroundColor: backgroundColor[2],
      stack: 'Stack 0',
      data: newTaskCount
    }, {
      label: 'Ready for Test',
      backgroundColor: backgroundColor[3],
      stack: 'Stack 0',
      data: readyForTestTaskCount
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
  return state.sprintList.map(sprintName => { 
    return {
      value: sprintName,
      label: sprintName
    }
  });
}
