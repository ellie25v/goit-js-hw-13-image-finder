const KEY = '15313999-a5df735b9fa1cf713cf16d2ec';

export default function pixiApI(search, page, callback){
    const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=${KEY}`;
    fetch(baseUrl).then(d => d.json()).then(d => callback(d)).catch(error => console.log(error));
}