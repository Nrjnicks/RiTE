#pragma strict
var CarNo :int;
var Health : float;
var Strength : float;
static var S : float;
var Acceleration : float;
var Speed :float;

var barDisplay : float = 0;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(60,20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

function OnGUI()
{
	
    // draw the background:
    GUI.BeginGroup (new Rect (Screen.width- pos.x, pos.y, size.x, size.y));
        GUI.Label (Rect (0,0, size.x, size.y),progressBarEmpty);
		
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
            GUI.Label (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();
		
    GUI.EndGroup ();

} 


function Start () {

S=Strength;
}

function Update () {

var AICarControl : AICarScriptTimer=GetComponent(AICarScriptTimer);
AICarControl.topSpeed=Speed;
AICarControl.maxTorque =Acceleration;

Strength=S;

var hit : AIHitScript = GetComponent(AIHitScript);
if(hit.boolhit==true)
{Health-= hit.relvec* hit.massC* Time.deltaTime* Time.deltaTime/Strength;
hit.boolhit=false;
barDisplay=(100-Health)/100;
}
if(Health<=0){
Application.LoadLevel("Won");
}
}