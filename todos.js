const fs = require('fs')

const fetchTodos = () => {
  try {
    const todos = JSON.parse(fs.readFileSync('data-store.json'));
    return todos;
  } catch (e) {
    return [];
  }
}

const storeTodos = (todos) => {
  fs.writeFileSync('data-store.json', JSON.stringify(todos));
}

const add = (todo) => {
  const todos = fetchTodos();
  const duplicateTodo = todos.filter(({title}) => title === todo.title);
  if(duplicateTodo.length ===0){
    todos.push(todo);
    storeTodos(todos);
  }
  return duplicateTodo.length === 0
}

const remove = (todo) => {
  const todos = fetchTodos();
  const filteredTodos = todos.filter(({title}) => title !== todo.title);
  storeTodos(filteredTodos);
  return todos.length !== filteredTodos.length
}

const list = () => {
  const todos = fetchTodos();
  console.log(`Prininting ${todos.length} todo(s).`)
  todos.map((todo)=>log(todo));
}

const read = (search) => {
  const todos = fetchTodos();

  return(todos.filter( todo => search.title === todo.title )[0])
}

const log = (todo) => {
  console.log('--');
  console.log('Todo: ',todo.title);
  console.log('Body: ', todo.body);
}


module.exports = {
  add,
  remove,
  list,
  read,
  log
}
