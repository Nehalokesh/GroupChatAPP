function createdGroup(e)
{
    e.preventDefault();
    const groupChatting = {
        groupChatting :e.target.group.value
    }
    console.log(groupChatting)
    const token = localStorage.getItem('token');
    axios.post("http://localhost:3000/postgroupChatting", groupChatting , {headers:{"Authorization":token}})
    .then(result=>{
        console.log(result)      
    })
    .catch(err=>console.log(err))

   e.target.group.value="";
}    


window.addEventListener('DOMContentLoaded',() =>{
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/getgroupChat",{headers:{"Authorization":token}})
    .then(result =>{
        console.log(result)
        const userid = result.data.user.id;
        let createNewUser=" <h1>GROUP</h1> "
        for(let i =0;i<result.data.data.length;i++)
        {
            const userId = result.data.data[i].userId;
            const isAdmin = result.data.data[i].isAdmin;
            const groupName = result.data.data[i].groupChat.GroupName;
            const groupid = result.data.data[i].groupChatId;
            const parentNode = document.getElementById('group-message')
            if(userid == userId && isAdmin == true)
            {
                createNewUser += `<li id='${groupid}'> -- ${groupName}--   
                <button  onclick=Messagebtn('${groupid}')>Message</button>
                <button  onclick=AddUserbtn('${groupid}')>AddUser</button>
                </li>`
            parentNode.innerHTML += createNewUser;
        }    
        else{
            createNewUser += `<li id='${groupid}'> -- ${groupName}--   
            <button  onclick=Messagebtn('${groupid}')>Message</button>
            </li>`
        }
    }


    })
    .catch(err=>{
        console.log(err)
    })
})


function Messagebtn(groupid)
{
    const data = document.getElementById('data');
    data.innerHTML = `<div><form  >
    <input type="text" name="chats" id="inputId"  required/>
    <button  id="text" onclick="showMessageinbutton(${groupid})">send</button>
   </form>  </div>`
   showMessages(groupid)
}

function showMessageinbutton(groupid)
{
    const token = localStorage.getItem('token')
    const message = document.getElementById('inputId').value
    axios.post(`http://localhost:3000/postmessage/${groupid}`,{message:message},{headers:{"Authorization":token}})
    .then(result =>{
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    })
}

function showMessages(groupid)
{
    axios.get(`http://localhost:3000/getmessage/${groupid}`)
    .then(result =>{
        console.log(result)
        const parentNode = document.getElementById('message')
        let createdGroup=" <h1>MESSAGE</h1>";
        for(let i=0;i<result.data.data.length;i++)
        {
            const name = result.data.data[i].user.name;
            const message = result.data.data[i].message;
            createdGroup += `<div>${name} : ${message}</div>`

        }
        parentNode.innerHTML= createdGroup;
    })
    .catch(err =>{
        console.log(err)
    })
}

function AddUserbtn(groupid)
{

    const data = document.getElementById('addUser');
    data.innerHTML = `<div><form>
    <input type="text" name="chats" id="userId"  required/>
    <button  id="text" onclick="AddUser(${groupid},event)">ADD USER</button>
   </form>  </div>`
   showAddUser(groupid)
}


function AddUser(groupid,e)
{
    e.preventDefault()
    console.log("hello")
    const user = document.getElementById('userId').value
    axios.post(`http://localhost:3000/AddUser/${groupid}`,{user:user})
    .then(result =>{
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    })
}

function showAddUser(groupid)
{
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:3000/getUser/${groupid}`,{headers:{"Authorization":token}})
    .then(result =>{
        console.log(result)
        const parentNode = document.getElementById('showAddUser')
        let createdGroup=" <h1>Adduser</h1>";
        const Address = result.data.Address.id;
        for(let i=0;i<result.data.data.length;i++)
        {
            const name = result.data.data[i].user.name;
            const id = result.data.data[i].user.id;
            const groupChatId = result.data.data[i].groupChatId;
            const isAdmin = result.data.data[i].isAdmin;
            if(Address == id)
            {
                createdGroup += ""; 
            }
            else{
                if(isAdmin == false)
                {
                    createdGroup += `<div> ${name} &nbsp; &nbsp; &nbsp; &nbsp;<button onclick=removeUser(${id},${groupChatId})>Remove User</button>
                    &nbsp; &nbsp; &nbsp; &nbsp; <button onclick=makeAdmin(${id},${groupChatId})>Make</button>
                    </div>`
                }
               else
               {
                createdGroup += `<div>${name}&nbsp; &nbsp; &nbsp; &nbsp;<button onclick=removeUser(${id},${groupChatId})>Remove User</button>
                &nbsp; &nbsp; &nbsp; &nbsp; <button onclick=RemoveAdmin(${id},${groupChatId})>REMOVEAdmin</button>
                </div>`
               }
            }
        }
        parentNode.innerHTML= createdGroup;
    })
    .catch(err =>{
        console.log(err)
    })
}
function removeUser(userid,groupid)
{
    axios.post(`http://localhost:3000/deleteUser/${groupid}`,{userid:userid})
    .then(result=>{
        alert('user Delete from group ')
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

function makeAdmin(userid,groupid)
{
    axios.post(`http://localhost:3000/makeAdmin/${groupid}`,{userid:userid})
    .then(result=>{
        alert('created admin from group ')
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

function RemoveAdmin(userid,groupid)
{
    axios.post(`http://localhost:3000/removeAdmin/${groupid}`,{userid:userid})
    .then(result=>{
        alert('remove admin from group ')
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
}