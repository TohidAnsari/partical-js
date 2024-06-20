const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = {
    x: undefined, 
    y: undefined
};
const particalArray = [];
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let hue = 0;
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 6; i++){
        particalArray.push(new Partical());
    }
    handelParticals();
});
class Partical{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 13 + 3;
        this.speedx = Math.random() * 3 - 1.5;
        this.speedy = Math.random() * 3 - 1.5;
        this.color = 'hsl('+ hue +',100%, 50%)';
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;
        if(this.size > 0.2){
            this.size -= 0.2;
        }
    }
    draw(x, y){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}
function handelParticals(){
    for (let i = 0; i < particalArray.length; i++) {
        for(let j = 0; j< particalArray.length; j++){
            const dx = particalArray[i].x - particalArray[j].x;
            const dy = particalArray[i].y - particalArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.lineWidth = 0.05;
                ctx.strokeStyle = particalArray[i].color;
                ctx.moveTo(particalArray[i].x , particalArray[i].y);
                ctx.lineTo(particalArray[j].x , particalArray[j].y);
                ctx.stroke();                
            }  
        }
        particalArray[i].update();
        particalArray[i].draw();
        if(particalArray[i].size <= 0.3){
            particalArray.splice(i, 1);
            i--;
        } 
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handelParticals();
    hue+=5;
    requestAnimationFrame(animate);
}
animate();
