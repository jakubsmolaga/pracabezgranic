let rot=0;
window.onload = ()=>{
  setInterval(()=>{
    document.getElementById('starybulwy').style=`transform: rotate(${rot}deg);`;
    rot+= 20;
    if(rot >= 360)rot-=360;
  }, 1000/20);
}
