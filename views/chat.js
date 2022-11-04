function chatStarted(e)
{
   e.preventDefault()

   const chats = {
       chats:e.target.chats.value
   }
   const token = localStorage.getItem('token');
   axios.post("http://localhost:3000/chatsstart", chats,{headers:{"Authorization":token}})
   .then(result=>{
       console.log(result)
       showList(chats)
   })
   .catch(err=>console.log(err))

  e.target.chats.value=""
}
function showList(user)
{
   const parentNode = document.getElementById('chats-display')
   const createNewUser = `<li id='${user.id}'> ${user.chats} -- </li>`

   parentNode.innerHTML += createNewUser;

}


window.addEventListener('DOMContentLoaded',() =>{
   const token = localStorage.getItem('token')
   axios.get("http://localhost:3000/getchats",{headers:{"Authorization":token}})
   .then(result =>{
       for(let i =0; i<result.data.response.length;i++)
       {
           const name =result.data.response[i].user.name;
           const message = result.data.response[i].message;
           const id = result.data.response[i].id;
           const parentNode = document.getElementById('chats-display')
           const createNewUser = `<div id='${id}'> ${name}---- ${message}--</div>`
           parentNode.innerHTML += createNewUser;

       }

   })
   .catch(err=>{
       console.log(err)
   })

})