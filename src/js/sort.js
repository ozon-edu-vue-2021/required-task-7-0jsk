import users from '../data.json';

export const popularUsers = users
  .reduce((heapIdxToFriendsCount, user) => {
    user.friends.forEach(id => {
      /**
       * Дешевле мутировать существующий объект, чем создавать каждый раз новый
       * Считаем друга, даже если это текущий пользователь
       */
      const arrIdx = id - 1;
      const friendsCount = heapIdxToFriendsCount?.[arrIdx]?.[1] ?? 0;
      heapIdxToFriendsCount[arrIdx] = [id, friendsCount + 1];
    });

    return heapIdxToFriendsCount;
  }, [])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([userId]) => users[userId - 1]);

export default (user) => {
  const sortedByName = users.sort((a, b) => a.name.localeCompare(b.name));

  const friends = [];
  const notFriends = [];

  for (const sortedUser of sortedByName) {
    if (friends.length === 3 && notFriends.length === 3) {
      break;
    }

    if (user.friends.includes(sortedUser.id)) {
      friends.length !== 3 && friends.push(sortedUser);
    } else {
      notFriends.length !== 3 && notFriends.push(sortedUser);
    }
  }

  return {
    friends,
    notFriends
  };
}

