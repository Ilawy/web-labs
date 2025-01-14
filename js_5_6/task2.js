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
const tableBody = document.getElementById("tableBody");

async function main() {
    const allUsers = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((d) => d.json());
    const allPosts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((d) => d.json());

    for (const user of allUsers) {
        const tr = document.createElement("tr");

        const username = document.createElement("td");
        username.textContent = user.username;
        tr.appendChild(username);

        const email = document.createElement("td");
        email.textContent = user.email;
        tr.appendChild(email);

        const company = document.createElement("td");
        company.textContent = user.company.name;
        tr.appendChild(company);

        const address = document.createElement("td");
        address.textContent =
            `${user.address.geo.lat}, ${user.address.geo.lng}`;
        tr.appendChild(address);

        const posts = document.createElement("td");
        const expander = document.createElement("button");
        expander.textContent = "Expand";
        expander.addEventListener("click", () => {
            posts_ul.classList.toggle("expand")
        });
        posts.append(expander);


        const posts_container = document.createElement("div")
        posts_container.classList.add("posts-container")
        const posts_ul = document.createElement("ul");
        posts_container.append(posts_ul)
        posts_ul.classList.add("posts");
        allPosts.filter((post) => post.userId === user.id).forEach(
            async (post) => {
                const comments = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
                ).then((d) => d.json()).then((d) => d.length);
                const el = document.createElement("li");

                const content = document.createElement("span")
                content.textContent = post.title
                content.classList.add("content")

                const commentsCount = document.createElement("span")
                commentsCount.classList.add("comments")
                commentsCount.textContent = comments

                el.append(content, commentsCount)

                posts_ul.appendChild(el);
            },
        );
        posts.append(posts_container);
        tr.appendChild(posts);

        tableBody.appendChild(tr);
    }
}

main();
