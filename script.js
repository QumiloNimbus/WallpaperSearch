const input=document.querySelector(".search")
const searchBtn=document.querySelector(".search-btn")
const imageSection=document.querySelector(".image-result")
const apiKey="2aCPEdnRDeBRuyeLtaRDpbzzJV7dlBGP";
const showMoreBtn=document.querySelector(".showmore-btn")

let page =1,purity=100;
let query;

async function search(keyword) {
    console.log("searching")
    try {
        const url=`https://wallhaven.cc/api/v1/search?q=${keyword}&purity=${purity}&page=${page}&apikey=${apiKey}`
        
        console.log(url)
        // const result = await fetch(`https://wallhaven.cc/api/v1/search?q=${keyword}&apikey=${apiKey}`)
        // const inside=encodeURIComponent(url)
        const result = await fetch(url);
        const data=await result.json();
        console.log(data)
        // const dataParsed = JSON.parse(data.contents);
        // console.log(data)
        displayImages(data);
    } catch (error) {
        console.error("Error fetching from Wallhaven:", error);
    }
}



searchBtn.addEventListener("click",()=>{
    query=input.value;
    purityCheck();
    search(query)
    console.log(query)
    imageSection.innerHTML="";
    page=1;
    
    console.log(purity)
})


function displayImages(imgObj){
    
    imgObj.data.map((image)=>{
        let container=document.createElement("div")
        let img=document.createElement("img")
        let link=document.createElement("a")

        link.href=image.path
        link.target="_blank"
        container.classList.add("img-container")
        console.log(1);
        // img.crossOrigin = "anonymous"
        img.src=image.thumbs.large;
        link.appendChild(img)
        container.appendChild(link)
        imageSection.appendChild(container)
    })
    showMoreBtn.style.display="block";
}

showMoreBtn.addEventListener("click",()=>{
    page++;
    console.log(page)
    search(query)
})

function purityCheck(){
    const sketchyFilter=document.getElementById("sketchy");
    const NSFWFilter=document.getElementById("NSFW");

    if(sketchyFilter.checked){
        purity+=10;
    }
    if(NSFWFilter.checked){
        purity+=1;
    }
    if(!sketchyFilter.checked && !NSFWFilter.checked){
        purity=100;
    }
}

// input.addEventListener("keydown", function(event) {
    
//     if (event.key === "enter") {
      
     
      
//       document.querySelector(".searchBtn").click();
//     }
//   }); 