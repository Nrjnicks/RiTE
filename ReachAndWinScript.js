#pragma strict
var SceneName :String;
function Start () {

}

function OnTriggerStay (other : Collider) {

if(other.tag=="PCar"){
WaitForSeconds(5);
Application.LoadLevel(SceneName);
}
else{
Application.LoadLevel("GameOver");
}}