'use strict';
// HTMLより入力欄、追加ボタン、追加した内容を表示するためにIDを取得
const addTask = document.getElementById('addtask');
const submitButton = document.getElementById('submit');
const todoLists = document.getElementById('todolists');
const radioAll = document.getElementById('allselect');
const radioWorking = document.getElementById('working');
const radioComplete = document.getElementById('complete');

// radioAll.addEventListener('change', radioSelect);
// radioWorking.addEventListener('change', radioSelect);
// radioComplete.addEventListener('change',radioSelect);
// 追加するための空配列を定義
const todos = [];

// 追加ボタンがクリックされたら実行する処理を実装
submitButton.addEventListener('click', () => {
  todos.push({
    id: todos.length,
    comment: addTask.value,
    status: '作業中',
  });
  addTask.value = '';


  createListView(todos);
  radioAll.addEventListener('change', radioSelect);
  radioWorking.addEventListener('change', radioSelect);
  radioComplete.addEventListener('change', radioSelect);
  
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
    todoDelete.appendChild(createDeleteButton(index)); //foreach内の引数が使えるので、インデックスであるindex引数を代入
    todoStatus.appendChild(createStatusButton(task)); //foreach内の引数が使えるので、第一引数のtaskを代入

    //todoItem内に各要素を差し込む
    todoItem.appendChild(todoId);
    todoItem.appendChild(todoComment);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoDelete);

    //<tbody></tbody>内にtodoItemを差し込む
    todoLists.appendChild(todoItem);
  });
};

// タスク表示/非表示切り替え機能の実装

const radioSelect = () => {
  if (radioAll.checked) {
    todos.slice();
    createListView(todos);
    return;
  } else if (radioWorking.checked) {
    const radiowork = todos.filter((todo) => {
      return todo.status === '作業中';
    });
    createListView(radiowork);
  } else if (radioComplete.checked) {
    const radiocmp = todos.filter((todo) => {
      return todo.status === '完了';
    });
    createListView(radiocmp);
  }
};

//作業中ボタンをクリックすると完了ボタンになる処理を実装(foreach内でまわす処理なのでforeachの引数を使える)
const createStatusButton = (task) => {
  const statusButton = document.createElement('button');
  statusButton.innerHTML = task.status;
  statusButton.addEventListener('click', () => {
    if (task.status === '作業中') {
      task.status = '完了';
    } else {
      task.status = '作業中';
    }

    createListView(todos);
    radioAll.addEventListener('change', radioSelect);
    radioWorking.addEventListener('change', radioSelect);
    radioComplete.addEventListener('change', radioSelect);
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
    radioAll.addEventListener('change', radioSelect);
    radioWorking.addEventListener('change', radioSelect);
    radioComplete.addEventListener('change', radioSelect);
  });
  //クリック発火で使われたdeleteButtonを返してあげないと、appendChild内で関数を使って削除ボタンを作った際にnullが返されエラーになる
  return deleteButton;
};
