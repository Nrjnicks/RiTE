var bullets : Rigidbody;
var weapon :String;
var t:float = 5;
private var frame:int;
private var flag:int;

function Start(){
frame=t*60;
}

function Update(){
var AICarControl : AIWeaponisedCarScript=GetComponent(AIWeaponisedCarScript);
var AIHealthC : AIHealthWScript=GetComponent(AIHealthWScript);
if(AICarControl.NWeapon=="Nitro"){
if(AICarControl.run==1&&AICarControl.Nammo>0&&AICarControl.Frame==0){
AICarControl.run=0;


AICarControl.Nammo--;
AICarControl.maxTor=AICarControl.maxTor+25;
AICarControl.tempS=AICarControl.tempS+50;
AICarControl.Frame=t*60;
}
}
else{if(AICarControl.NWeapon=="Spikes"){

if(AICarControl.run==1&&AICarControl.Nammo>0&&flag==0){
AICarControl.run=0;
flag=1;
frame=60;
clone = Instantiate(bullets,transform.position,transform.rotation);
AICarControl.Nammo--;
clone.velocity=transform.TransformDirection(Vector3(0,0,-5));
Destroy(clone.gameObject,t);
}

if(flag==1)
frame--;
if(frame==0){
AICarControl.run=0;
flag=0;
frame=t*60;
}
}
else{
if(AICarControl.NWeapon=="Shield"){
if(AICarControl.run==1&&AICarControl.Nammo>0&&flag==0){
flag=1;
AICarControl.run=0;

AICarControl.Nammo--;
AIHealthC.S+=25;
Debug.Log(AIHealthC.S);
}
if(flag==1)
frame--;
if(frame==0){
AIHealthC.S-=25;
flag=0;
frame=t*60;
}}
else{
if(AICarControl.NWeapon=="Health")
if(AICarControl.run==1&&AICarControl.Nammo>0&&flag==0){
flag=1;


AICarControl.Nammo--;

AIHealthC.Hlt+=25;
frame=60;
}
if(flag==1)
frame--;
if(frame==0){
flag=0;
frame=t*60;
}
}
}
}
}