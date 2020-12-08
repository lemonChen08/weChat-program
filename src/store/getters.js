const getters = {
  userName: state => state.app.userName,
  isIOS: ({ubi: {isIOS}}) => isIOS
}
export default getters
