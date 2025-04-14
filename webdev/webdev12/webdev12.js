/*!
 * matter-js 0.20.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 */
 // [ ... Paste the entire Matter.js v0.20.0 library code here ... ]
 // Make sure this library code is loaded *before* your script runs.

 if (typeof Matter === 'undefined') {
    console.error("Matter.js library not loaded. Ensure the script is included before this code.");
  } else {
 
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
 
    const worldElement = document.querySelector(".boops");
 
    if (!worldElement) {
      console.error("Element with class '.boops' not found. Rendering will fail.");
    }
 
    function createBall() {
      const ball = Bodies.circle(Math.round(Math.random() * 1280), -30, 25, {
        angle: Math.PI * (Math.random() * 2 - 1),
        friction: 0.001,
        frictionAir: 0.01,
        restitution: .8,
        render: {
          sprite: {
            texture: "https://static-cdn.jtvnw.net/emoticons/v1/301299185/2.0"
          }
        }
      });
 
      setTimeout(() => {
        World.remove(engine.world, ball);
      }, 30000);
 
      return ball;
    }
 
    const engine = Engine.create();
    const runner = Runner.create();
 
    const render = Render.create({
      canvas: worldElement,
      engine: engine,
      options: {
        width: 1280,
        height: 720,
        background: "transparent",
        wireframes: false
      }
    });
 
    const boundaryOptions = {
      isStatic: true,
      restitution: .5,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent"
      }
    };
 
    const ground = Bodies.rectangle(640, 720, 1300, 4, boundaryOptions);
    const leftWall = Bodies.rectangle(0, 360, 4, 740, boundaryOptions);
    const rightWall = Bodies.rectangle(1280, 360, 4, 800, boundaryOptions);
 
    Render.run(render);
    Runner.run(runner, engine);
 
    World.add(engine.world, [ground, leftWall, rightWall]);
 
    const handleClick = () => {
      const ball2 = createBall();
      World.add(engine.world, [ball2]);
    };
 
    const button = document.querySelector("#boop");
 
    if (button) {
      button.addEventListener("click", handleClick);
    } else {
      console.warn("Button with ID '#boop' not found. Click functionality will not work.");
    }
 
  }