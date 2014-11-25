Artificial Intelligence of the rival car in RiTE is based on real the idea of 

Autonomous Cars.
Car runs with motor torque on rear wheel which rotates along the axis perpendicular to the wheelÎéÎ÷s plane and passing through the centre and it turns using the steering mechanism in the front wheel where wheel is rotated along the vertical axis of the car through the centre of the wheel.
Car finds its path using the location of certain points where it has to reach one by one. In Death Match level of the game, these points are fixed in the moving PlayerÎéÎ÷s car, and in the Survival game level, two types of path are placed, one for static weapons and other for moving Cars.
Like the original Autonomous Car's sensor Rival car has ray-cast which triggers itself when collided with a game objectÎéÎ÷s collider and tell the system about the environment, Rival car has 3 rays coming from the front, 2 directed 45 degrees in both directions from front centre one, and 2 directed at 90 degrees from the front center. When the front ray-casts are triggered, the motor torque is decreased and brake torque gets negative value, when angled ray-casts are trigger the steering wheels are turn with certain value, and when the ray-casts rotated by right angles are triggered, the turning is max.
For the Survival game level, these ray-casts are triggered with a flag if the rays are collided with 'car's collider' and when they are triggered, they shoot the weapon they are possessing.

