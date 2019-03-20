const teamMembers = [
  {
    name: 'Bailey Routzong',
    taigaId: 'broutzong',
    githubId: 'broutzong',
    pictureUrl: 'https://baileyroutzong.com/wp-content/uploads/2015/03/circle-man.png',
    totalCommits: 45
  },
  {
    name: 'Amy Koffee',
    taigaId: 'akoffee',
    githubId: 'akoffee',
    pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhi8xXNgLziI1Orp9x_10TGtmQSnZlCOseWC_0uUh5ZMhE5QM',
    totalCommits: 34
  },
  {
    name: 'Miguel Smith',
    taigaId: 'msmith',
    githubId: 'msmith',
    pictureUrl: 'https://broadstreetautoloans.com/Content/images/circle-person02.png',
    totalCommits: 23
  },
  {
    name: 'Mr Wicked',
    taigaId: 'wickedfan',
    githubId: 'wicked4eva',
    pictureUrl: 'http://www.onecenter.in/wp-content/uploads/2018/07/face.png',
    totalCommits: 34
  }
]

/**
 * Team Reducer
 * Gets called each time there's an action
 * Currently, it always returns a spread of the current state,
 * as well as the mock data above in the property teamMembers
 */
const teamReducer = (state = {}, action) => {
  console.log('in team reducer');
  return {
    ...state,
    teamMembers: teamMembers
  }
}

export default teamReducer