var centerOfMass : Vector3;
var path : Array;
var pathGroup : Transform;
var maxSteer : float = 15.0;
var wheelFL : WheelCollider; 
var wheelFR : WheelCollider;
var wheelRL : WheelCollider; 
var wheelRR : WheelCollider;
var currentPathObj : int;
var distFromPath : float = 20;
var maxTorque : float = 50;
var currentSpeed : float;
var topSpeed : float = 150;
var decellarationSpeed : float = 10;
var breakingMesh : Renderer;
var idleBreakLight : Material;
var activeBreakLight : Material;
var isBreaking : boolean;
var inSector : boolean;
var sensorLength : float = 5;
var frontSensorStartPoint : float = 5;
var frontSensorSideDist : float = 5;
var frontSensorsAngle : float = 30;
var sidewaySensorLength : float = 5;
var avoidSpeed : float = 10;
private var flag : int = 0;
var reversing : boolean = false;
var reverCounter : float = 0.0;
var waitToReverse : float = 2.0;
var reverFor : float = 1.5;
var respawnWait: float = 5;
var respawnCounter : float = 0.0;
var Sparks : GameObject;

var collisionSound :GameObject;

static var lapC:int=0;



function Start () {
rigidbody.centerOfMass = centerOfMass;
GetPath();
lapC=0;
}

function GetPath (){
var path_objs : Array = pathGroup.GetComponentsInChildren(Transform);
path = new Array();

for (var path_obj : Transform in path_objs){
 if (path_obj != pathGroup)
  path [path.length] = path_obj;
}
}


function Update () {
if (flag == 0)
GetSteer();
Move();
BreakingEffect ();
Sensors();
Respawn ();

}

function GetSteer(){
var steerVector : Vector3 = transform.InverseTransformPoint(Vector3(path[currentPathObj].position.x,transform.position.y,path[currentPathObj].position.z));
var newSteer : float = maxSteer * (steerVector.x / steerVector.magnitude);
wheelFL.steerAngle = newSteer;
wheelFR.steerAngle = newSteer;

if (steerVector.magnitude <= distFromPath){
currentPathObj++;
if (currentPathObj >= path.length)
currentPathObj = 0;
}

}

function Move (){
currentSpeed = 2*(22/7)*wheelRL.radius*wheelRL.rpm * 60 / 1000;
currentSpeed = Mathf.Round (currentSpeed);
if (currentSpeed <= topSpeed && !inSector){
if (!reversing){
wheelRL.motorTorque = maxTorque;
wheelRR.motorTorque = maxTorque;
}
else {
wheelRL.motorTorque = -maxTorque;
wheelRR.motorTorque = -maxTorque;
}
wheelRL.brakeTorque = 0;
wheelRR.brakeTorque = 0;
}
else if (!inSector){
wheelRL.motorTorque = 0;
wheelRR.motorTorque = 0;
wheelRL.brakeTorque = decellarationSpeed;
wheelRR.brakeTorque = decellarationSpeed;
}
}

function BreakingEffect (){
if (isBreaking){
breakingMesh.material = activeBreakLight;
}
else {
breakingMesh.material = idleBreakLight;
}

}

function Sensors(){
flag = 0;
var avoidSenstivity : float = 0;
var pos : Vector3;
var hit : RaycastHit;
var rightAngle = Quaternion.AngleAxis(frontSensorsAngle,transform.up) * transform.forward;
var leftAngle = Quaternion.AngleAxis(-frontSensorsAngle,transform.up) * transform.forward;



pos = transform.position;
pos += transform.forward*frontSensorStartPoint;

//BRAKING SENSOR

if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
wheelRL.brakeTorque = decellarationSpeed;
wheelRR.brakeTorque = decellarationSpeed;
Debug.DrawLine(pos,hit.point,Color.red);
}
}
else {
wheelRL.brakeTorque = 0;
wheelRR.brakeTorque = 0;
}


//Front Straight Right Sensor
pos += transform.right*frontSensorSideDist;

if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
avoidSenstivity -= 1; 

Debug.DrawLine(pos,hit.point,Color.white);
}
}
else if (Physics.Raycast(pos,rightAngle,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
avoidSenstivity -= 0.5; 
flag++;
Debug.DrawLine(pos,hit.point,Color.white);
}
}


//Front Straight left Sensor
pos = transform.position;
pos += transform.forward*frontSensorStartPoint;
pos -= transform.right*frontSensorSideDist;

if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
avoidSenstivity += 1; 

Debug.DrawLine(pos,hit.point,Color.white);
}
}
else if (Physics.Raycast(pos,leftAngle,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
avoidSenstivity += 0.5;
Debug.DrawLine(pos,hit.point,Color.white);
}
}

//Right SideWay Sensor
if (Physics.Raycast(transform.position,transform.right,hit,sidewaySensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
avoidSenstivity -= 0.5;
Debug.DrawLine(transform.position,hit.point,Color.white);
}
}


//Left SideWay Sensor
if (Physics.Raycast(transform.position,-transform.right,hit,sidewaySensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
flag++;
avoidSenstivity += 0.5;
Debug.DrawLine(transform.position,hit.point,Color.white);
}
}

pos = transform.position;
pos += transform.forward*frontSensorStartPoint;
//Front Mid Sensor
if (avoidSenstivity == 0){

if (Physics.Raycast(pos,transform.forward,hit,sensorLength)){
if (hit.transform.tag != "Terrain"||hit.transform.tag=="Lap"){
if (hit.normal.x < 0 )
avoidSenstivity = -1;
else 
avoidSenstivity = 1;
Debug.DrawLine(pos,hit.point,Color.white);
}
}
}


if (rigidbody.velocity.magnitude < 2 && !reversing){
reverCounter += Time.deltaTime;
if (reverCounter >= waitToReverse){
reverCounter = 0;
reversing = true;
}
}
else if (!reversing){
reverCounter = 0; 
}


if (reversing){
avoidSenstivity *= -1;
reverCounter += Time.deltaTime;
if (reverCounter >= reverFor){
reverCounter = 0;
reversing = false;
}
}


if (flag != 0)
AvoidSteer (avoidSenstivity);


}


function AvoidSteer (senstivity : float){
wheelFL.steerAngle = avoidSpeed*senstivity;
wheelFR.steerAngle = avoidSpeed*senstivity;

}


function Respawn (){
if (rigidbody.velocity.magnitude < 2){
respawnCounter += Time.deltaTime;
if (respawnCounter >= respawnWait){
if (currentPathObj == 0){
transform.position = path[path.length-1].position;
}
else{
transform.position = path[currentPathObj-1].position;
}
respawnCounter = 0;
transform.localEulerAngles.z = 0;
}
}
} 



function OnCollisionEnter (other : Collision) {
if(other.transform!=transform && other.contacts.length !=0){
for(var i=0;i<other.contacts.length;i++){
Instantiate(Sparks,other.contacts[i].point,Quaternion.identity);
var clone : GameObject =Instantiate(collisionSound,other.contacts[i].point,Quaternion.identity);
clone.transform.parent= transform;
}

}

}