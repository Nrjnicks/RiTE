#pragma strict
static var relvec:float;
static var massC: float;
 var boolhit:boolean;

var hitN :int;
function Start () {
hitN=0;
}

function Update () {

}
function OnCollisionEnter(collision : Collision)
{

boolhit=true;
if(collision.collider.tag!="Terrain"){
relvec =collision.relativeVelocity.magnitude;
massC=collision.other.rigidbody.mass;
hitN++;
}
}