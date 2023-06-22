// Variables
const form = document.querySelector('#form')
const blog_container = document.querySelector('.Blog_container')
let blog_info = []



// Events
form.addEventListener('submit',blog_verify)

document.addEventListener('DOMContentLoaded', ()=>{
    blog_info = JSON.parse(localStorage.getItem('blog')) || []
    create_blog()
})


// Functions
function blog_verify(e){
    e.preventDefault()

    const title_blog = document.querySelector('#blog_title').value
    const body_blog = document.querySelector('#blog_body').value
   
    inputs = {
        id: Date.now(),
        title:title_blog,
        body: body_blog,

    }


    if(Object.values(inputs).includes('')){

        alert_message('One of the input is empty, try again..')
        return
    }

    blog_info= [...blog_info, inputs]


    create_blog()
    form.reset()
}



function create_blog(){
    remove_blog()

      if(blog_info.length>0){
        blog_info.forEach(blog =>{
         
            
            const btn_delete= document.createElement('i')
            btn_delete.classList.add('remove_blog', 'bi', 'bi-trash3-fill', 'text-danger')

            btn_delete.onclick=()=>{

                delete_blog(blog.id)
            }

            const container= document.createElement('div')
            const p = document.createElement('p')
            const h2 = document.createElement('h2')
            h2.innerText= blog.title
            p.innerText= blog.body

            container.classList.add('mt-4', 'col-6', 'card', 'p-2')
            container.appendChild(h2)
            container.appendChild(p)
 
            container.appendChild(btn_delete)
            blog_container.appendChild(container)

           
        })
      }
      localStorage_blog()
}


function localStorage_blog(){
    localStorage.setItem('blog', JSON.stringify(blog_info))

}


function delete_blog(id){
  blog_info= blog_info.filter(blog => blog.id !== id)
  create_blog()
}

function remove_blog(){
    while(blog_container.firstChild){
        blog_container.removeChild(blog_container.firstChild)   
    }
}

function alert_message(message){
remove_blog()
 const alert= document.createElement('p')
 alert.classList.add('alert','alert-danger')
 alert.innerText= message

 blog_container.appendChild(alert)

setTimeout(() => {
    alert.remove()
    
}, 3000);


}

