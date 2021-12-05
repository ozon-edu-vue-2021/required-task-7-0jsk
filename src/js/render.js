import sort, { popularUsers } from "./sort.js";
import users from "../data.json";

const render = (username, {friends, notFriends, popularUsers}) => {
  const tabTemplate = document.querySelector('#listTab');

  const friendsList = document.querySelector('.social__friends');
  const notFriendsList = document.querySelector('.social__not-friends');
  const popularUsersList = document.querySelector('.social__popular-people');
  const usernameNode = document.querySelector('.profile__name');

  [friendsList, notFriendsList, popularUsersList].forEach(node => node.innerHTML = "");
  usernameNode.textContent = username;

  const userListToListNode = {
    friends: {
      users: friends,
      node: friendsList
    },
    notFriends: {
      users: notFriends,
      node: notFriendsList
    },
    popularPeopleList: {
      users: popularUsers,
      node: popularUsersList
    }
  }

  const renderList = (users, listNode) => {
    const usersList = users.map(user => {
      const tabRoot = tabTemplate.content.cloneNode(true);

      tabRoot.querySelector('.tab__title').textContent = user.name;
      tabRoot.querySelector('.list__tab')
        .addEventListener('click', () => {
          const {friends, notFriends} = sort(user);

          render(
            user.name,
            {
              friends,
              notFriends,
              popularUsers
            }
          );
        });
      1

      return tabRoot;
    })

    usersList.forEach(userNode => listNode.appendChild(userNode));
  }

  Object.values(userListToListNode).forEach(({users, node}) => renderList(users, node));
}

// for initial user
const user = users[0];
const {friends, notFriends} = sort(user);

render(
  user.name,
  {
    friends,
    notFriends,
    popularUsers
  }
);
