    var state = true;     
$(document).ready(function () {
    var resx = 800;
    var resy =  600;
    var scoreDelay = 0;
    var maxDelay = 25;
        
    // create an new instance of a pixi stage
    var container = new PIXI.Container();
    var loader = PIXI.loader;
             
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(resx, resy,{backgroundColor : 0x1099bb});
    state = true;             
    container.interactive = true;
    
    //this we need to keep
    container.hitArea = new PIXI.Rectangle(0, 0, resx, resy);


    // add the renderer view element to the DOM
    //$('body').append(renderer.view);
    document.getElementById("game").appendChild(renderer.view); 
    
    var heroLocation = 'pics/Hero.png';
    
    loader
        .add(heroLocation)
        .load(animate);   
        
        

    
    var player = new playerObj(heroLocation, 0.5,0.5,100,100);
    player.addSprite(container);
    player.setPosition(100,500);

    var enemyimg = 'pics/Antagonist.png';

    var enemy = new enemyObj(enemyimg, 0.6,0.6,400,300);
    enemy.addSprite(container);
    enemy.setPosition(400,300);
    
    //score card
    var score = new scoreObj(0.5,0.5, 700, 50);
    score.addSprite(container);

    container.mousedown = function (event) 
    {
        player.Move(event.data.originalEvent.clientX, event.data.originalEvent.clientY);
    };
    
    container.tap  = function(event){
        player.Move(event.data.global.x, event.data.global.y);
    };
    
            
    function animate() {
        requestAnimationFrame( animate );
        
        if(enemy.exists === true)
        {
            enemy.Fly(player.obj.position.x, player.obj.position.y);
            
        }
        
        //state();
        // just for fun, let's rotate mr rabbit a little
        if(player.exists === true){
            player.Animate();
        }else{
            state = false;
        }
        
        if(score.exists === true && (scoreDelay == maxDelay)){
            score.Animate();
            scoreDelay = 0;
        }else{
            scoreDelay++;
        }
  
        if(state === true){
            renderer.render(container);
        }
    }
});