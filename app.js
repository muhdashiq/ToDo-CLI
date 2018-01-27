const yargs = require('yargs')
const todos = require('./todos.js')
const App = () => {

  const titleAttributeOption = {
    demand:true,
    alias: 'a',
    describe: 'title for the todo.'
  };
  const bodyAttributeOption = {
    demand: false,
    alias: 'b',
    describe: 'description of the new todo'
  };

  const argv = yargs
  .command('add','Add a new todo to the list',{
    title: titleAttributeOption,
    body: bodyAttributeOption
  })
  .command('list', 'List all todos from the store')
  .command('remove', 'To remove a todo which is already completed', {
    title: titleAttributeOption
  })
  .command('read', 'To dispaly full description of the a todo', {
    title: titleAttributeOption
  })
  .help('help')
  .demandCommand(1, '[Error] You need at least one command before moving on')
  .argv;
  const command = argv._[0];
  if(command === 'add'){
    const newTodo = {
      title: argv.title,
      body: argv.body
    };
    if(todos.add(newTodo)){
      console.log('Todo addded');
    } else {
      console.log('Todo title exist')
    }
  } else if(command === 'list'){
    todos.list();
  } else if(command === 'remove'){
    if(todos.remove({title: argv.title})){
      console.log('Todo deleted')
    } else {
      console.log('Todo not found')
    }
  } else if(command === 'read') {
    const readedTodo = todos.read({title: argv.title})
    if(readedTodo){
      todos.log(readedTodo);
    } else {
      console.log('Todo not found')
    }
  }
}

module.exports.init = App;
