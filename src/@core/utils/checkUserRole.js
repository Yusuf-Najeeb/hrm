export const getUserRole = ()=>{
    let activeUser 
  
    if (typeof window !== 'undefined') {
      activeUser = JSON.parse(localStorage.getItem('loggedInUser')) || {}
    }

  
    return activeUser
}