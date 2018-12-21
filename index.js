// Library Code
function createStore(reducer) {
 // Thre store should have four aprts
 // 1. The state
 // 2. Get the state.
 // 3. Listen to changes on the state.
 // 4. Update the state.

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// Reducer Code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }))
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Jog',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Read a book',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 3,
  name: 'Wash the car',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 4,
  name: 'Make a snack',
  complete: false
}))

store.dispatch(removeTodoAction(1))

store.dispatch(addGoalAction({
  id: 4,
  name: 'Lose 20lbs',
  complete: false
}))

store.dispatch(addGoalAction({
  id: 4,
  name: 'Learn React',
  complete: false
}))


store.dispatch(addReactAction({
  id: 4,
  name: 'Master pure functions',
  complete: false
}))
