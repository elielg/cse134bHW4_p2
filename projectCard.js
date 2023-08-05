class ProjectCard extends HTMLElement {
    constructor() {
        super();

        const jsonData = {
            title: 'Local Storage Load',
            imageSource: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTbX4kyAKSWkOT_amdu2gC9C2RKjaE6ZQrnLOpK1XSNy41NC0cSZw6eVVBW4lPAAJe_YcF2UAvDhp8pQxc',
            Description: 'This description was loaded from local storage',
            linkUrl: 'https://en.wikipedia.org/wiki/University_of_California,_San_Diego'
        };

        const jsonString = JSON.stringify(jsonData);

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
            flex-direction: column;
            gap: 10%;
            background-color: #557A95;
            border: 5px solid #2A3132; /* Add a border */
            width: 20%;
            border-radius: 5%; 
            justify-content: center; /* Center items horizontally along the main axis */
        align-items: center; /
        


        }
      
        .card-inner{
            
            text-align: center;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically */
            width:70%;
            background-color: #90AFC5;
            margin-bottom: 4%;
            padding-bottom: 4%;
            border: 5px solid #2A3132; /* Add a border */
            border-radius: 5%; 
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5); 

            
        }
    
        .img{
            max-width: 90%;
            border-radius: 5%; 
            border: 5px solid #2A3132; /* Add a border */
            overflow: hidden; 
            margin: 20px;
        }
        
        .button{
            background-color: #F56C57;
            border: 2px solid #2A3132; /* Add a border */

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
                <button id="local-button" class="button">Load Local</button>
                <button id="storage-button" class="button">Load Storage</button>
          </section>
          </section>
      </section>
        `;

        const localButton = this.querySelector('#local-button');
        const storageButton = this.querySelector('#storage-button');

        localButton.addEventListener('click', () => {

            this.setAttribute('description', 'New local description');

            const storedData = localStorage.getItem('localCard');
            const jsonData = JSON.parse(storedData);

            for (const key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    console.log(`Attribute: ${key}, Value: ${jsonData[key]}`);
                    this.setAttribute(`${key}`, `${jsonData[key]}`);
                }
            }
            this.render();
        });

        storageButton.addEventListener('click', () => {

            const apiKey = '$2b$10$Krbk7mlsC7PF1zs0pLUtS.YKK3zRY/5Dp7M7VmwfOHkIEvHj29Czq';

            const url = `https://api.jsonbin.io/v3/b/64ce728db89b1e2299cbdce5`;

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