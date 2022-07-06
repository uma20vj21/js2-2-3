'use strict';
// HTMLより入力欄、追加ボタン、追加した内容を表示するためにIDを取得
const addTask = document.getElementById('addtask');
const submitButton = document.getElementById('submit');
const todoLists = document.getElementById('todolists');

// 追加するための空配列を定義
const todos = [];

// 追加ボタンがクリックされたら実行する処理を実装
submitButton.addEventListener('click', () => {
  todos.push({
    id: todos.length,
    comment: addTask.value,
    status: '作業中',
  });

  createListView(todos);

  addTask.value = '';
});


const createListView = (todos) => {
  // todosLists直下に子要素がなくなるまで、子要素を削除し続ける処理
  while (todoLists.firstChild) {
    todoLists.removeChild(todoLists.firstChild);
  }
  todos.forEach((task, index) => {
    const todoItem = document.createElement('tr');

    const todoId = document.createElement('th');
    const todoComment = document.createElement('th');
    const todoStatus = document.createElement('th');
    const todoDelete = document.createElement('th');
    todoId.innerHTML = index + 1; //コールバック関数の第二引数でインデックスを取得させinnerHTMLで記述
    todoComment.innerHTML = task.comment; //コールバック関数の第一引数(task)からtodosの各値を取得させinnerHTMLで記述
    todoDelete.appendChild(createDeleteButton(todos.id)); //createDeleteButtonに配列のidを渡してあげる
    todoStatus.appendChild(createStatusButton(todos));

    //todoItem内に各要素を差し込む
    todoItem.appendChild(todoId);
    todoItem.appendChild(todoComment);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoDelete);

    //<tbody></tbody>内にtodoItemを差し込む
    todoLists.appendChild(todoItem);
  });
};


//作業中ボタンをクリックすると完了ボタンになる処理を実装
const createStatusButton = (todos) => {
  const statusButton = document.createElement('button');
  statusButton.innerHTML = todos.status;
  statusButton.addEventListener('click', () => {
    if (todos.status === '作業中') {
      todos.status = '完了';
    } else {
      todos.status = '作業中';
    }
    createListView(todos);
  });
  return statusButton;
};

// 削除ボタンが押されたらタスクを消す処理を実装
const createDeleteButton = (index) => {
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '削除';
  deleteButton.addEventListener('click', () => {
    todos.splice(index, 1);

    createListView(todos);
  });
  //クリック発火で使われたdeleteButtonを返してあげないと、appendChild内で関数を使って削除ボタンを作った際にnullが返されエラーになる
  return deleteButton;
};

