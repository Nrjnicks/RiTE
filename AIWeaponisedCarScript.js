var centerOfMass : Vector3;
var path : Array;
var pathGroup : Transform;
var pathR : Array;
var pathRGroup : Transform;
var CarNoMin :int;
var CarNoMax :int;
var maxSteer : float = 15.0;
var wheelFL : WheelCollider; 
var wheelFR : WheelCollider;
var wheelRL : WheelCollider; 
var wheelRR : WheelCollider;
var currentPathObj : int;
var currentPathObjR : int;
var distFromPath : float = 20;
static var maxTorque : float = 50;
var currentSpeed : float;

static var cur :float;
static var recoil :float=0;
static var topSpeed : float = 150;
var decellarationSpeed : float = 10;
var breakingMesh : Renderer;
var idleBreakLight : Material;
var activeBreakLight : Material;
var isBreaking : boolean;
var inSector : boolean;
var sensorLength : float = 5;
var frontSensorStartPoint : float = 2.5;
var frontSensorSideDist : float = 1;
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

var collisionSound :GameObject ;


static var Weapon : String;
var WeaponName :String;
static var NWeapon :String;
var nweapon:String;

static var Nammo :int=0;
var nammo :int =0;
static var ammo :int;
var Ammunition:int;

static var fire:int;


static var UsedWeapon :int[];


static var tempS : float;

static var maxTor :float;

static var Frame : int;
static var f:int;
static var run:int;
var fm:int;



function Start () {
rigidbody.centerOfMass = centerOfMass;
ammo=0;
maxTorque = 50;
topSpeed = 150;
tempS=topSpeed;
maxTor=maxTorque;

GetPath();


UsedWeapon=new Array(path.length);
for (var i:int=0;i<path.length;i++){
UsedWeapon[i]=0;
}


}

function GetPath (){
var path_objs : Array = pathGroup.GetComponentsInChildren(Transform);
path = new Array();

for (var path_obj : Transform in path_objs){
 if (path_obj != pathGroup)
  path [path.length] = path_obj;
}
var path_objsR : Array = pathRGroup.GetComponentsInChildren(Transform);
pathR = new Array();

for (var path_objR : Transform in path_objsR){
 if (path_objR != pathGroup)
  pathR [pathR.length] = path_objR;
}
currentPathObj=Random.value*10000%path.length;
currentPathObjR=Random.value*10000%pathR.length;
}


function FixedUpdate () {
cur=currentSpeed;
if(Frame>0){
f=1;
topSpeed=tempS;
maxTorque=maxTor;
Frame--;}
if(f==1&&Frame==0){
f=0;
topSpeed-=50;
tempS-=50;
maxTor-=25;
}

nweapon = NWeapon;

}

function Update () {
Ammunition=ammo;
WeaponName=Weapon;
nammo=Nammo;



if (flag == 0)
GetSteer();
Move();
BreakingEffect ();
Sensors();

Respawn ();
}

function GetSteer(){
var steerVector : Vector3;
var newSteer : float;

if(ammo==0){

steerVector = transform.InverseTransformPoint(Vector3(path[currentPathObj].position.x,transform.position.y,path[currentPathObj].position.z));
newSteer  = maxSteer * (steerVector.x / steerVector.magnitude);
wheelFL.steerAngle = newSteer;
wheelFR.steerAngle = newSteer;

if (steerVector.magnitude ==0 ){
currentPathObj=Random.value*10000%path.length;
Debug.Log(currentPathObj);
if (UsedWeapon[currentPathObj]!=1)
currentPathObj=Random.value*10000%path.length;
}
}
else{
if(currentPathObjR>CarNoMax||currentPathObjR<CarNoMin){
if(fm!=0){
fm--;
steerVector  = transform.InverseTransformPoint(Vector3(pathR[currentPathObjR].position.x,transform.position.y,pathR[currentPathObjR].position.z));
newSteer  = maxSteer * (steerVector.x / steerVector.magnitude);
wheelFL.steerAngle = newSteer;
wheelFR.steerAngle = newSteer;

}
else{
fm=3600;
currentPathObjR=Random.value*10000%pathR.length;
}}
else{
currentPathObjR=Random.value*10000%pathR.length;
}

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
if (hit.transform.tag != "Terrain"){
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
if (hit.transform.tag != "Terrain"){
flag++;
avoidSenstivity -= 1; 

Debug.DrawLine(pos,hit.point,Color.white);
if(hit.transform.tag=="PCar"||hit.transform.tag=="AICar")
{fire=1;

}

}
}
else if (Physics.Raycast(pos,rightAngle,hit,sensorLength)){
if (hit.transform.tag != "Terrain"){
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
if (hit.transform.tag != "Terrain"){
flag++;
avoidSenstivity += 1; 

Debug.DrawLine(pos,hit.point,Color.white);
if(hit.transform.tag=="PCar"||hit.transform.tag=="AICar")
{fire=1;

}
}
}
else if (Physics.Raycast(pos,leftAngle,hit,sensorLength)){
if (hit.transform.tag != "Terrain"){
flag++;
avoidSenstivity += 0.5;
Debug.DrawLine(pos,hit.point,Color.white);
}
}

//Right SideWay Sensor
if (Physics.Raycast(transform.position,transform.right,hit,sidewaySensorLength)){
if (hit.transform.tag != "Terrain"){
flag++;
avoidSenstivity -= 0.5;
Debug.DrawLine(transform.position,hit.point,Color.white);
}
}


//Left SideWay Sensor
if (Physics.Raycast(transform.position,-transform.right,hit,sidewaySensorLength)){
if (hit.transform.tag != "Terrain"){
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
if (hit.transform.tag != "Terrain"){
if (hit.normal.x < 0 )
avoidSenstivity = -1;
else 
avoidSenstivity = 1;
Debug.DrawLine(pos,hit.point,Color.white);
if(hit.transform.tag=="PCar"||hit.transform.tag=="AICar")
{fire=1;

}

}
}
}



//Back
if (Physics.Raycast(pos,-transform.forward,hit,sensorLength)){
if (hit.transform.tag != "Terrain"){
flag++;

Debug.DrawLine(pos,hit.point,Color.red);


}
if(hit.transform.tag=="PCar"||hit.transform.tag=="AICar")
{
if(Nammo>0)
run=1;

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


if (flag != 0){
AvoidSteer(avoidSenstivity);


}

}
function AvoidSteer (senstivity : float){
if(fire==0){
wheelFL.steerAngle = avoidSpeed*senstivity;
wheelFR.steerAngle = avoidSpeed*senstivity;

}}


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

