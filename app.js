const yargs = require('yargs')
const todo = require('./todo.js')
const App = () => {
  console.log('Application begins');

  const {argv} = yargs;
  const command = argv._[0];
  if(command === 'add'){
    const newTodo = {
      title: argv.title,
      body: argv.body
    };
    if(todo.add(newTodo)){
      console.log('Todo addded');
    } else {
      console.log('Todo title exist')
    }
  } else if(command === 'list'){
    todo.list();
  } else if(command === 'remove'){
    if(todo.remove({title: argv.title})){
      console.log('Todo deleted')
    } else {
      console.log('Todo not found')
    }
  } else if(command === 'read') {
    const readedTodo = todo.read({title: argv.title})
    if(readedTodo){
      todo.log(readedTodo);
    } else {
      console.log('Todo not found')
    }
  }
}

module.exports.init = App;
