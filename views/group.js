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
        console.log(result.data.data[0].groupChat.GroupName)
        for(let i =0;i<result.data.data.length;i++)
        {
            const groupName = result.data.data[i].groupChat.GroupName;
            const groupid = result.data.data[i].groupChatId;
            const parentNode = document.getElementById('group-message')
            const createNewUser = `<li id='${groupid}'> -- ${groupName}--   
                <button  onclick=Messagebtn('${groupid}')>Message</button>
                <button  onclick=AddUserbtn('${groupid}')>AddUser</button>
                </li>`
            parentNode.innerHTML += createNewUser;
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
        let createdGroup=""
        for(let i=0;i<result.data.data.length;i++)
        {
            const name = result.data.data[i].user.name;
            const message = result.data.data[i].message;
            createdGroup += `<div>-${name}-${message}---</div>`

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
    axios.get(`http://localhost:3000/getUser/${groupid}`)
    .then(result =>{
        console.log(result)
        // const parentNode = document.getElementById('showAddUser')
        // let createdGroup="";
        // for(let i=0;i<result.data.data.length;i++)
        // {
        //     const name = result.data.data[i].user.name;
        //     const message = result.data.data[i].message;
        //     createdGroup += `<div>-${name}-${message}---</div>`

        // }
        // parentNode.innerHTML= createdGroup;
    })
    .catch(err =>{
        console.log(err)
    })
}