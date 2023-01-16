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
    t;
  }
}

const teamAScore = 0;
const teamBScore = 0;

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

    // // east boundary
    // if (ball.getComponent(Transform).position.z > 1) {
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }
    // if (ball.getComponent(Transform).position.z < 63) {
    //   ball.getComponent(BallMovement).direction.x =
    //     ball.getComponent(BallMovement)?.direction.x * -1;
    // }

    // WA

    if (ball.getComponent(Transform).position.z > 63) {
      ball.getComponent(BallMovement).direction.z =
        ball.getComponent(BallMovement)?.direction.z * -1;
    }
  }
}
engine.addSystem(new BallSystem());

// const point1 = new Vector3(8, 0, 8)
// const point2 = new Vector3(8, 0, 24)
// const point3 = new Vector3(24, 0, 24)
// const point4 = new Vector3(24, 0, 8)
