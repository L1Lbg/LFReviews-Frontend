import { redirect } from "react-router-dom";

export default function Admin(){
    let videos = [
      "https://youtu.be/dQw4w9WgXcQ",
    ];
    const randomIndex = Math.floor(Math.random() * videos.length);
    setTimeout(()=>{
        console.log('redirect')
        console.log(videos[randomIndex]);
        window.location.href=videos[randomIndex]
    },4000)
    return (
        <h1 style={{'color':'white', 'fontSize':'3rem'}}>Redirection a la page d'administrateur...</h1>
    )
}