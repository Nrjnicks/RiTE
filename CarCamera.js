#pragma strict
var car : Transform;
var distance : float = 6.4;
var height : float = 1.4;
var RotationDamping : float = 3.0;
var HeightDamping : float = 2.0;
var ZoomRatio : float = 0.5;
private var RotationVector : Vector3;
var defaultfov :float = 60;

function Start () {

}

function LateUpdate () {
var WantedAngle = RotationVector.y;
var WantedHeight = car.position.y + height;
var MyAngle = transform.eulerAngles.y;
var MyHeight = transform.position.y;
MyAngle = Mathf.LerpAngle(MyAngle, WantedAngle ,RotationDamping* Time.deltaTime);
MyHeight= Mathf.Lerp(MyHeight , WantedHeight ,HeightDamping * Time.deltaTime);
var CurrentRotation = Quaternion.Euler(0,MyAngle,0);
transform.position=car.position;
transform.position -= CurrentRotation*Vector3.forward*distance;
transform.position.y = MyHeight;
transform.LookAt(car);

}

function FixedUpdate()
{
var localvelocity = car.InverseTransformDirection(car.rigidbody.velocity);
if(localvelocity.z<-0.5)
{
RotationVector.y =car.eulerAngles.y +180;
}
else {
RotationVector.y =car.eulerAngles.y ;
}
var acc= car.rigidbody.velocity.magnitude;
camera.fieldOfView = defaultfov +acc*ZoomRatio;

}