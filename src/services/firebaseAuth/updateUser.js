import currentUser from "./currentUser";

const updateUser = async userName => {
  var user = await currentUser();
  return user.updateProfile({
    displayName: userName
  });
};

export default updateUser;
