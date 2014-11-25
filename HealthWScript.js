#pragma strict
var CarNo :int;
var Health : float;
var Strength : float;
static var S : float;
var Acceleration : float;
var Speed :float;
var maxHealth:float;
static var Hlt:float;
static var H : int;
var explosion: GameObject;

var barDisplay : float = 0;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(60,20);
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

function OnGUI()
{
	
    // draw the background:
    GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
        GUI.Label (Rect (0,0, size.x, size.y),progressBarEmpty);
		
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x-size.x * barDisplay, size.y));
            GUI.Label (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();
		
    GUI.EndGroup ();

} 
function Start () {
Health=maxHealth;
S=Strength;
Hlt=Health;
}

function Update () {
var CarControl : carControlweaponScript=GetComponent(carControlweaponScript);
CarControl.topSpeed=Speed;
CarControl.maxTorque =Acceleration;
Health=Hlt;
if(Health>maxHealth){
Health=maxHealth;
Hlt=maxHealth;
barDisplay=(maxHealth-Hlt)/maxHealth;}

Strength=S;
H=parseInt(Health);
var hit : HitScript = GetComponent(HitScript);
if(hit.boolhit){
Hlt-= hit.relvec* hit.massC* Time.deltaTime* Time.deltaTime/Strength;
hit.boolhit=false;
barDisplay=(maxHealth-Hlt)/maxHealth;

if(Health<=0){
Application.LoadLevel("GameOver");

}
}
}