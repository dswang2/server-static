
function getData(url){
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onreadystatechange = () =>{
            if(request.readyState === 4){
                if(request.status >= 200 && request.status <= 300){
                    resolve.call(null,request);
                }else {
                    reject.call(null,null);
                }
            }
        }
        request.send();
    })
}

getCSS.onclick = () => {
    getData('./style.css').then((request) => {
        const style = document.createElement('style');
        style.innerHTML = request.response;
        document.head.appendChild(style);
    });
}

getJS.onclick = () =>{
    getData('./3.js').then((request) => {
        const script = document.createElement('script');
        script.innerHTML = request.response;
        document.body.appendChild(script);
    });
}

getHTML.onclick = () => {
    getData('./indexa.html').then((request) => {
        console.log(request.response);
    });
}

getXML.onclick = () => {
    getData('./3.xml').then((request) => {
        const dom = request.responseXML;
        const text = dom.getElementsByTagName('warning')[0].textContent;
        console.log(text.trim());
    });
};

getJSON.onclick = () => {
    getData('./3.json').then((request) => {
        console.log(request.response);
        console.log(JSON.parse(request.response));
    });
};