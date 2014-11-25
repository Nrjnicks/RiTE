#pragma strict

private var currentFrictionValue : float;

var skidAt : float = 1.5;

var soundEmition : float = 15;

private var soundWait : float;

var skidSound : GameObject;

var skidSmoke : GameObject;

var smokeDepth : float = 0.4;

var markWidth : float = 0.2;

var rearWheel : boolean;

private var skidding : int;

private var lastPos = new Vector3[2];

var skidMaterial : Material;


function Start () {


skidSmoke.transform.position = transform.position;

skidSmoke.transform.position.y -= smokeDepth;

}

 

function Update () {

var hit : WheelHit;

transform.GetComponent(WheelCollider).GetGroundHit(hit);

currentFrictionValue = Mathf.Abs(hit.sidewaysSlip);

var rpm = transform.GetComponent(WheelCollider).rpm;

if (skidAt <= currentFrictionValue && soundWait <= 0 || rpm < 300 && Input.GetAxis("Vertical")>0 && soundWait <= 0 && rearWheel && hit.collider){

Instantiate(skidSound,hit.point,Quaternion.identity);

soundWait = 1;

}

soundWait -= Time.deltaTime*soundEmition;

if (skidAt <= currentFrictionValue || rpm < 300 && Input.GetAxis("Vertical")>0 && rearWheel && hit.collider){

skidSmoke.particleEmitter.emit = true;

SkidMesh();

}

else {

skidSmoke.particleEmitter.emit = false;

skidding = 0;

}

}

 

function SkidMesh(){

 

var hit : WheelHit;

transform.GetComponent(WheelCollider).GetGroundHit(hit);

var mark : GameObject = new GameObject("Mark");

var filter : MeshFilter = mark.AddComponent(MeshFilter);

mark.AddComponent(MeshRenderer);

var markMesh : Mesh = new Mesh();

var vertices = new Vector3 [4];

var triangles = new int[6];

 

if (skidding == 0){

vertices[0] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.01,0);

vertices[1] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.01,0);

vertices[2] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.01,0);

vertices[3] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.01,0);

lastPos[0] = vertices[2];

lastPos[1] = vertices[3];

skidding = 1;

}

else {

vertices[1] = lastPos[0];

vertices[0] = lastPos[1];

vertices[2] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.01,0);

vertices[3] = hit.point + Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.01,0);

lastPos[0] = vertices[2];

lastPos[1] = vertices[3];

} 

 

triangles = [0,1,2,2,3,0];

markMesh.vertices = vertices;

markMesh.triangles = triangles;

markMesh.RecalculateNormals();

var uvm: Vector2[] = new Vector2[4];

uvm[0] = Vector2(1,0);

uvm[1] = Vector2(0,0);

uvm[2] = Vector2(0,1);

uvm[3] = Vector2(1,1);

markMesh.uv = uvm;

filter.mesh = markMesh;

mark.renderer.material = skidMaterial;


mark.AddComponent(DestroyTimerScript);

}