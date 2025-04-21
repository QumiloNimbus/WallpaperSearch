const input=document.querySelector(".search")
const searchBtn=document.querySelector(".search-btn")
const imageSection=document.querySelector(".image-result")
const apiKey="2aCPEdnRDeBRuyeLtaRDpbzzJV7dlBGP";
const showMoreBtn=document.querySelector(".showmore-btn")
let page =1;
let query;

async function search(keyword) {
    console.log("searching")
    try {
        const url=`https://wallhaven.cc/api/v1/search?q=${keyword}&apikey=${apiKey}`
        //&apikey=${apiKey}${keyword}&page=
        console.log(url)
        // const result = await fetch(`https://wallhaven.cc/api/v1/search?q=${keyword}&apikey=${apiKey}`)
        const inside=encodeURIComponent(url)
        const result = await fetch(`${url}`);
        const data=await result.json();
        console.log(data)
        const dataParsed = JSON.parse(data.contents);
        // console.log(data)
        displayImages(data);
    } catch (error) {
        console.error("Error fetching from Wallhaven:", error);
    }
}



searchBtn.addEventListener("click",()=>{
    query=input.value;
    search(query)
    console.log(query)
    imageSection.innerHTML="";
    page=1;
})


function displayImages(imgObj){
    
    imgObj.data.map((image)=>{
        let container=document.createElement("div")
        container.classList.add("img-container")
        let img=document.createElement("img")
        console.log(1);
        img.src=image.path
        container.appendChild(img)
        imageSection.appendChild(container)
    })
    showMoreBtn.style.display="block";
}

showMoreBtn.addEventListener("click",()=>{
    page++;
    console.log(page)
    search(query)
})

