#pragma strict
var waitFor :int;
var Scene:String;
function Start () {
waitFor*=60;
}

function Update () {
waitFor--;
if(waitFor==0)
Application.LoadLevel(Scene);
}