import { Dash_Tweaker } from "dcldash";

//Create ball entity
const ball = new Entity();
ball.addComponent(new Transform({ position: new Vector3(1, 0.8, 1) }));
ball.addComponent(new SphereShape());
ball.addComponent(
  new OnPointerDown((e) => {
    if (ball.hasComponent(BallMovement)) ball.removeComponent(BallMovement);
    else ball.addComponent(new BallMovement(new Vector3(3.5, 0, 5.4)));
  })
);
engine.addEntity(ball);

//Create ball movement component
@Component("BallMovement")
class BallMovement {
  direction: Vector3;
  constructor(direction: Vector3) {
    this.direction = direction;
  }
}

let teamAScore = 0;
let teamBScore = 0;

const ghost = new Entity();

ghost.addComponentOrReplace(new PlaneShape());
ghost.addComponentOrReplace(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
);
engine.addEntity(ghost);
Dash_Tweaker(ghost);

//System Creation
class BallSystem implements ISystem {
  update(dt: number): void {
    if (ball.hasComponent(BallMovement)) {
      ball
        .getComponent(Transform)
        .position.addInPlace(
          ball
            .getComponent(BallMovement)
            .direction.multiply(new Vector3().setAll(dt / 1))
        );
    }

    // south boundary
    if (ball.getComponent(Transform).position.x > 14) {
      ball.getComponent(BallMovement).direction.x =
        ball.getComponent(BallMovement)?.direction.x * -1;
    }

    if (ball.getComponent(Transform).position.x < 1) {
      // reset();
      ball.getComponent(BallMovement).direction.x =
        ball.getComponent(BallMovement)?.direction.x * -1;
    }

    // east boundary
    // if (ball.getComponent(Transform).position.z < 1) {
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }
    // if (ball.getComponent(Transform).position.z > 63) {
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }

    // // west boundary
    // if (ball.getComponent(Transform).position.z > 1) {
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }

    if (ball.getComponent(Transform).position.z > 63) {
      // reset("teamBScore");
      ball.getComponent(BallMovement).direction.z =
        ball.getComponent(BallMovement)?.direction.z * -1;
    }

    if (ball.getComponent(Transform).position.z < 1) {
      reset("teamAScore");
      ball.getComponent(BallMovement).direction.z =
        ball.getComponent(BallMovement)?.direction.z * -1;
    }

    // if (ball.getComponent(Transform).position.z < 63) {
    //   log("North boundary Team B");
    //   teamAScore++;
    //   // // reset();
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }

    function reset(teamScore: string): void {
      if (teamScore === "teamAScore") {
        teamAScore++;
        log("teamAScore", teamAScore);
        ball.getComponentOrCreate(Transform).position = new Vector3(8, 0.8, 8);
        ball.removeComponent(BallMovement);
      }

      if (teamScore === "teamBScore") {
        teamBScore++;
        log("teamBScore", teamBScore);
        ball.getComponentOrCreate(Transform).position = new Vector3(8, 0.8, 60);
        ball.removeComponent(BallMovement);
      }
      
    }
    // WA
  }
}

engine.addSystem(new BallSystem());

function reset() {
  throw new Error("Function not implemented.");
}
// const point1 = new Vector3(8, 0, 8)
// const point2 = new Vector3(8, 0, 24)
// const point3 = new Vector3(24, 0, 24)
// const point4 = new Vector3(24, 0, 8)
