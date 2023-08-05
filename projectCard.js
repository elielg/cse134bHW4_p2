class ProjectCard extends HTMLElement {
    constructor() {
        super();

        // Sample JSON data
        const jsonData = {
            title: 'Local Storage Load',
            imageSource: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTbX4kyAKSWkOT_amdu2gC9C2RKjaE6ZQrnLOpK1XSNy41NC0cSZw6eVVBW4lPAAJe_YcF2UAvDhp8pQxc',
            Description: 'This description was loaded from local storage',
            linkUrl: 'https://youtu.be/dQw4w9WgXcQ'
        };

        // Convert JSON data to a string
        const jsonString = JSON.stringify(jsonData);

        // Save the stringified JSON data to localStorage
        localStorage.setItem('localCard', jsonString);

    }

    connectedCallback() {
        this.render();
    }



    render() {
        this.innerHTML = `
        <style>
        /* News Card */
        .card {
            display: flex;
            background-color: #90AFC5;
            border: 5px solid #2A3132; /* Add a border */
            width: 50%;

        }
      
        .card-inner{
            text-align: center;
            width:80%;
            
        }
    
        .img{
            max-width: 50%;
            border-radius: 50%; /* Make the image circular */
            overflow: hidden; /* Hide any overflow content */
            margin: 20px;
        }
        
    
       

        </style>


        <section class="container">
          <section class="card">
          <img src="${this.getAttribute('imageSource')}" class="img" />
          <section class="card-inner">
                <h2 class="title">${this.getAttribute('title')}</h2>
                <p>${this.getAttribute('Description')}</p>
                <a href="${this.getAttribute('linkUrl')}" class="link-button" target="_blank">Read More</a>
                <br>
                <button class="local-button">Load Local</button>
                <button class="storage-button">Load Storage</button>
          </section>
          </section>
      </section>
        `;

        const localButton = this.querySelector('.local-button');
        const storageButton = this.querySelector('.storage-button');

        localButton.addEventListener('click', () => {
            // Update the Description attribute with a new value
            this.setAttribute('description', 'New local description');
            // Call render again to update the HTML content
            const storedData = localStorage.getItem('localCard');
            const jsonData = JSON.parse(storedData);

            // Check if the data exists in localStorage
            for (const key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    console.log(`Attribute: ${key}, Value: ${jsonData[key]}`);
                    this.setAttribute(`${key}`, `${jsonData[key]}`);
                }
            }
            this.render();
        });

        storageButton.addEventListener('click', () => {

            // Replace 'API_KEY' with your actual JSONbin.io API key
            const apiKey = '$2b$10$Krbk7mlsC7PF1zs0pLUtS.YKK3zRY/5Dp7M7VmwfOHkIEvHj29Czq';

            // Construct the URL for fetching data
            const url = `https://api.jsonbin.io/v3/b/64ce728db89b1e2299cbdce5`;

            // Set headers for authentication
            const headers = {
                'X-Access-Key': apiKey,
                'Content-Type': 'application/json',
            };

            // Fetch data from JSONbin.io
            fetch(url, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.record);
                    // Parse the fetched JSON data
                    const parsedData = data.record;

                    // Enumerate each key and attribute
                    for (const key in parsedData) {
                        if (parsedData.hasOwnProperty(key)) {
                            console.log(`Key: ${key}, Value: ${parsedData[key]}`);
                            this.setAttribute(`${key}`, `${parsedData[key]}`);

                        }
                    }
                    this.render();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            
        });
    }


}

window.customElements.define('project-card', ProjectCard);