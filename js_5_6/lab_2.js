/*
2 - Use fetch method with url https://jsonplaceholder.typicode.com/users
To get data asynchronously from the API and display the Result on HTML
table
- Display the following Coulmns in table
    - UserName
    - email
    - Company Name
    - Address geo (address GeoLocation)
    - show users posts’ titles as ul list in this column
        and show how many comments are made by each post. /posts /comments
*/


/**@type {HTMLElement} */
const tableBody = document.getElementById("tableBody")

async function main(){
    const allUsers = await fetch("https://jsonplaceholder.typicode.com/users").then(d=>d.json())
    const allPosts = await fetch("https://jsonplaceholder.typicode.com/posts").then(d=>d.json())
    
    for (const user of allUsers){
        const tr = document.createElement('tr')
        
        const username = document.createElement('td')
        username.textContent = user.username;
        tr.appendChild(username)

        const email = document.createElement('td');
        email.textContent = user.email;
        tr.appendChild(email);
        
        const company = document.createElement('td');
        company.textContent = user.company.name;
        tr.appendChild(company);
        
        const address = document.createElement('td');
        address.textContent = `${user.address.geo.lat}, ${user.address.geo.lng}`;
        tr.appendChild(address);

        const posts = document.createElement('ul');
        posts.classList.add("posts")
        allPosts.filter(post=>post.userId === user.id).forEach(async post=>{
            const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then(d=>d.json()).then(d=>d.length)
            const title = document.createElement('li');
            title.textContent = `${post.title} (${comments})`
            posts.appendChild(title)
        })
        tr.appendChild(posts)
        
        
        tableBody.appendChild(tr)
    }
    
    
}



main()