#pragma strict
var CarNo :int;
var CarNumber:int;
var Health : float;
var Strength : float;
static var S : float;
var Acceleration : float;
var Speed :float;
var show:boolean;
var barDisplay : float = 0;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(60,20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
var maxHealth :int;
static var Hlt:float;

function OnGUI()
{
	if(show){
    // draw the background:
    GUI.BeginGroup (new Rect (Screen.width- pos.x, pos.y, size.x, size.y));
        GUI.Label (Rect (0,0, size.x, size.y),progressBarEmpty);
		
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * barDisplay, size.y));
            GUI.Label (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();
		
    GUI.EndGroup ();

} }


function Start () {
CarNo=CarNumber;
maxHealth=Health;
S=Strength;
Hlt=Health;
}

function Update () {

var AICarControl : AIWeaponisedCarScript=GetComponent(AIWeaponisedCarScript);
AICarControl.topSpeed=Speed;
AICarControl.maxTorque =Acceleration;
Strength=S;
Health=Hlt;
if(Health>maxHealth){
Health=maxHealth;
Hlt=maxHealth;
barDisplay=(maxHealth-Hlt)/maxHealth;}

var hit : AIHitScript = GetComponent(AIHitScript);
if(hit.boolhit==true)
{Hlt-= hit.relvec* hit.massC* Time.deltaTime* Time.deltaTime/Strength;

hit.boolhit=false;
barDisplay=(maxHealth-Hlt)/maxHealth;
}
if(Health<=0){
Application.LoadLevel("Won");
}
}
