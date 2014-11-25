var bullets : Rigidbody;
var weapon :String;
var t:float = 5;
private var frame:int;
private var flag:int;

function Start(){
frame=t*60;
}

function Update(){
var CarControl : carControlweaponScript=GetComponent(carControlweaponScript);
var HealthC : HealthWScript=GetComponent(HealthWScript);
if(CarControl.NWeapon=="Nitro"){
if(Input.GetKeyDown(KeyCode.Z)&&CarControl.Nammo>0&&CarControl.Frame==0){



CarControl.Nammo--;
CarControl.maxTor=CarControl.maxTor+25;
CarControl.tempS=CarControl.tempS+50;
CarControl.Frame=t*60;
}
}
else{if(CarControl.NWeapon=="Spikes"){
if(Input.GetKeyDown(KeyCode.Z)&&CarControl.Nammo>0){
clone = Instantiate(bullets,transform.position,transform.rotation);
CarControl.Nammo--;
clone.velocity=transform.TransformDirection(Vector3(0,0,-5));
Destroy(clone.gameObject,t);
}}
else{
if(CarControl.NWeapon=="Shield"){
if(Input.GetKeyDown(KeyCode.Z)&&CarControl.Nammo>0&&flag==0){
flag=1;


CarControl.Nammo--;
HealthC.S+=25;

}
if(flag==1)
frame--;
if(frame==0){
HealthC.S-=25;
flag=0;
frame=t*60;
}}
else{
if(CarControl.NWeapon=="Health")
if(Input.GetKeyDown(KeyCode.Z)&&CarControl.Nammo>0&&flag==0){
flag=1;


CarControl.Nammo--;

HealthC.Hlt+=25;
frame=120;
}
if(flag==1)
frame--;
if(frame==0){
flag=0;
frame=t*60;
}
}
}
}}